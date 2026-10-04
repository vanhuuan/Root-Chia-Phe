import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { test } from "node:test";
import nextEnv from "@next/env";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { connectionOptions } from "../db/connection.mjs";
import * as schema from "../db/schema";
import { createRoom, readRoom, joinRoom, updateRoom, RoomError } from "../db/rooms";
import { POST as create } from "../app/api/rooms/route";
import { GET as read, POST as join, PUT as update } from "../app/api/rooms/[code]/route";
import { GET as health } from "../app/api/health/route";

const execute = promisify(execFile);
nextEnv.loadEnvConfig(process.cwd());

test("PostgreSQL migration and room integration", async (t) => {
  const source = process.env.DATABASE_URL;
  assert.ok(source, "Configure a local DATABASE_URL before testing");
  const url = new URL(source);
  assert.ok(["localhost", "127.0.0.1", "[::1]"].includes(url.hostname), "Tests only run against loopback PostgreSQL");
  const admin = postgres(source, { ...connectionOptions(source), max: 1 });
  const databaseName = `root_test_${randomUUID().replaceAll("-", "")}`;
  await admin.unsafe(`CREATE DATABASE "${databaseName}"`);
  url.pathname = `/${databaseName}`;
  process.env.DATABASE_URL = url.toString();
  const client = postgres(url.toString(), connectionOptions(url.toString()));
  const db = drizzle(client, { schema });
  const migrate = () => execute(process.execPath, ["scripts/migrate.mjs"], {
    env: { ...process.env, DATABASE_URL: url.toString() },
  });
  try {
    await t.test("fresh migration, repeat and simultaneous deploy jobs", async () => {
      await migrate();
      await Promise.all([migrate(), migrate()]);
      const [history] = await client`SELECT count(*)::int AS total FROM drizzle.__drizzle_migrations`;
      assert.equal(history.total, 1);
      const columns = await client`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'rooms'`;
      assert.equal(columns.find(c => c.column_name === "created_at")?.data_type, "bigint");
      const [index] = await client`SELECT indexname FROM pg_indexes WHERE indexname = 'idx_room_members_room_code'`;
      assert.ok(index);
    });
    await t.test("atomic creation, duplicate code retry and exhaustion", async () => {
      await createRoom(db, "one", "Một", () => "DUP123");
      let calls = 0;
      assert.deepEqual(await createRoom(db, "two", "Hai", () => calls++ ? "NEW123" : "DUP123"), { code: "NEW123" });
      await assert.rejects(createRoom(db, "three", "Ba", () => "DUP123"),
        (error: unknown) => error instanceof RoomError && error.code === "ROOM_CODE_EXHAUSTED");
      const snapshot = await readRoom(db, "dup123");
      assert.equal(snapshot.hostId, "one");
      assert.equal(snapshot.members.length, 1);
      assert.equal(typeof snapshot.members[0].joined_at, "number");
    });
    await t.test("simultaneous creators colliding on the same code", async () => {
      const tasks = Array.from({ length: 5 }, (_, i) => {
        let first = true;
        return createRoom(db, `collision-${i}`, "Collision", () => {
          if (first) { first = false; return "RACE12"; }
          return `SAFE0${i}`;
        });
      });
      const created = await Promise.all(tasks);
      assert.equal(new Set(created.map(room => room.code)).size, 5);
      for (const room of created) assert.equal((await readRoom(db, room.code)).members.length, 1);
    });
    await t.test("join capacity race and bot clamping", async () => {
      const { code } = await createRoom(db, "capacity-host", "Host");
      await updateRoom(db, code, { hostId: "capacity-host", config: { bots: 5 } });
      const attempts = await Promise.allSettled(Array.from({ length: 12 }, (_, i) => joinRoom(db, code, `guest-${i}`, `Guest ${i}`)));
      assert.equal(attempts.filter(item => item.status === "fulfilled").length, 5);
      for (const item of attempts) if (item.status === "rejected") assert.equal(item.reason.code, "ROOM_FULL");
      const snapshot = await readRoom(db, code);
      assert.equal(snapshot.members.length, 6);
      assert.equal(snapshot.config.bots, 0);
      assert.equal(snapshot.revision, 6);
      assert.equal(snapshot.result, null);
    });
    await t.test("idempotent concurrent rejoin retains timestamp and revision", async () => {
      const { code } = await createRoom(db, "rejoin-host", "Host");
      await Promise.all(Array.from({ length: 8 }, (_, i) => joinRoom(db, code, "same-guest", `Guest ${i}`)));
      const snapshot = await readRoom(db, code);
      assert.equal(snapshot.members.length, 2);
      assert.equal(snapshot.revision, 1);
      const joinedAt = snapshot.members.find(m => m.user_id === "same-guest")!.joined_at;
      const renamed = await joinRoom(db, code, "same-guest", "Tên mới");
      assert.equal(renamed.members.find(m => m.user_id === "same-guest")!.joined_at, joinedAt);
      assert.equal(renamed.revision, 1);
    });
    await t.test("concurrent host updates preserve saved result and every revision", async () => {
      const { code } = await createRoom(db, "update-host", "Host");
      const result = { map: "autumn", reach: 17, assignments: [{ userId: "update-host", factionId: "marquise-de-cat" }] };
      const writes = await Promise.all([
        updateRoom(db, code, { hostId: "update-host", config: { map: "autumn" }, result }),
        ...Array.from({ length: 10 }, (_, i) => updateRoom(db, code, { hostId: "update-host", config: { map: "autumn", marker: i } })),
      ]);
      assert.deepEqual(writes.map(r => r.revision).sort((a, b) => a - b), Array.from({ length: 11 }, (_, i) => i + 1));
      assert.deepEqual((await readRoom(db, code)).result, result);
      const cleared = await updateRoom(db, code, { hostId: "update-host", config: {}, result: null });
      assert.equal(cleared.result, null);
    });
    await t.test("simultaneous joins and host updates cannot overfill bot capacity", async () => {
      const { code } = await createRoom(db, "mixed-host", "Host");
      await Promise.all([
        ...Array.from({ length: 4 }, (_, i) => joinRoom(db, code, `mixed-${i}`, "Guest")),
        ...Array.from({ length: 8 }, () => updateRoom(db, code, { hostId: "mixed-host", config: { bots: 5 } })),
      ]);
      const snapshot = await readRoom(db, code);
      assert.equal(snapshot.members.length, 5);
      assert.equal(snapshot.config.bots, 1);
      assert.equal(snapshot.revision, 12);
    });
    await t.test("HTTP contracts, errors, faction and clearing result round trip", async () => {
      const request = (method: string, body: unknown) => new Request("http://localhost/api/rooms", {
        method, headers: { "content-type": "application/json" }, body: JSON.stringify(body),
      });
      assert.equal((await create(request("POST", {}))).status, 400);
      const created = await create(request("POST", { hostId: "http-host", displayName: "Chủ phòng" }));
      assert.equal(created.status, 200);
      assert.equal(created.headers.get("cache-control"), "no-store");
      const { code } = await created.json();
      const ctx = { params: Promise.resolve({ code }) };
      assert.equal((await join(request("POST", { userId: "http-guest", displayName: "Bạn bè" }), ctx)).status, 200);
      assert.equal((await update(request("PUT", { hostId: "wrong", config: {} }), ctx)).status, 403);
      assert.equal((await update(request("PUT", { hostId: "http-host" }), ctx)).status, 400);
      const result = { map: "autumn", reach: 17, assignments: [
        { userId: "http-host", factionId: "marquise-de-cat" }, { userId: "http-guest", factionId: "eyrie-dynasties" },
      ], clearings: { suits: ["fox", "mouse", "rabbit"], flooded: [], landmarks: [] } };
      await update(request("PUT", { hostId: "http-host", config: { map: "autumn", enabled: ["marquise-de-cat", "eyrie-dynasties"] }, result }), ctx);
      const snapshot = await (await read(new Request("http://localhost"), ctx)).json();
      assert.deepEqual(snapshot.result, result);
      assert.equal(snapshot.revision, 2);
      assert.equal((await read(new Request("http://localhost"), { params: Promise.resolve({ code: "ABSENT" }) })).status, 404);
      assert.deepEqual(await health().json(), { status: "ok" });
    });
  } finally {
    await client.end();
    const globalDb = globalThis as typeof globalThis & { rootDb?: { $client: postgres.Sql } };
    if (globalDb.rootDb) { await globalDb.rootDb.$client.end(); delete globalDb.rootDb; }
    // Only the random database created by this test is removed.
    await admin.unsafe(`DROP DATABASE "${databaseName}"`);
    await admin.end();
    process.env.DATABASE_URL = source;
  }
});
