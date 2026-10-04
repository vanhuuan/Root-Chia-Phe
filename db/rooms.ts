import { randomInt } from "node:crypto";
import { and, asc, count, eq, sql } from "drizzle-orm";
import type { Database } from "./index";
import { rooms, roomMembers } from "./schema";

type Transaction = Parameters<Parameters<Database["transaction"]>[0]>[0];
type RoomRow = typeof rooms.$inferSelect;
export type RoomConfig = { bots?: unknown; [key: string]: unknown };

export class RoomError extends Error {
  constructor(public code: string, public status: number) { super(code); }
}

export function generateRoomCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => alphabet[randomInt(alphabet.length)]).join("");
}

async function snapshot(tx: Transaction, room: RoomRow) {
  const members = await tx.select({
    user_id: roomMembers.userId, display_name: roomMembers.displayName,
    faction_id: roomMembers.factionId, joined_at: roomMembers.joinedAt,
  }).from(roomMembers).where(eq(roomMembers.roomCode, room.code)).orderBy(asc(roomMembers.joinedAt));
  return {
    code: room.code, title: room.title, hostId: room.hostId,
    config: JSON.parse(room.configJson || "{}"),
    result: room.stateJson ? JSON.parse(room.stateJson) : null,
    revision: room.revision, members,
  };
}

async function lockedRoom(tx: Transaction, code: string, mode: "update" | "share" = "update") {
  const [room] = await tx.select().from(rooms).where(eq(rooms.code, code.toUpperCase())).for(mode);
  if (!room) throw new RoomError("ROOM_NOT_FOUND", 404);
  return room;
}

export async function createRoom(db: Database, hostId: string, displayName: string, codeFactory = generateRoomCode) {
  // The unique constraint resolves collisions atomically, across replicas too.
  for (let attempt = 0; attempt < 8; attempt++) {
    const code = codeFactory();
    const created = await db.transaction(async (tx) => {
      const now = Date.now();
      const inserted = await tx.insert(rooms).values({
        code, hostId, title: `Phòng của ${displayName}`,
        configJson: JSON.stringify({ map: "autumn", enabled: [] }),
        stateJson: "", revision: 0, createdAt: now, updatedAt: now,
      }).onConflictDoNothing({ target: rooms.code }).returning({ code: rooms.code });
      if (!inserted.length) return false;
      await tx.insert(roomMembers).values({ roomCode: code, userId: hostId, displayName, joinedAt: now });
      return true;
    });
    if (created) return { code };
  }
  throw new RoomError("ROOM_CODE_EXHAUSTED", 503);
}

export async function readRoom(db: Database, code: string) {
  return db.transaction(async (tx) => snapshot(tx, await lockedRoom(tx, code, "share")));
}

export async function joinRoom(db: Database, code: string, userId: string, displayName: string) {
  return db.transaction(async (tx) => {
    const room = await lockedRoom(tx, code);
    if (!userId || !displayName) throw new RoomError("NAME_REQUIRED", 400);
    const [memberCount] = await tx.select({ total: count() }).from(roomMembers).where(eq(roomMembers.roomCode, room.code));
    const [existing] = await tx.select({ userId: roomMembers.userId }).from(roomMembers)
      .where(and(eq(roomMembers.roomCode, room.code), eq(roomMembers.userId, userId)));
    if (!existing && memberCount.total >= 6) throw new RoomError("ROOM_FULL", 409);
    await tx.insert(roomMembers).values({ roomCode: room.code, userId, displayName, joinedAt: Date.now() })
      .onConflictDoUpdate({ target: [roomMembers.roomCode, roomMembers.userId], set: { displayName } });
    let updated = room;
    if (!existing) {
      const config = JSON.parse(room.configJson || "{}");
      config.bots = Math.max(0, Math.min(6 - memberCount.total - 1, Number(config.bots || 0)));
      [updated] = await tx.update(rooms).set({
        configJson: JSON.stringify(config), stateJson: "",
        revision: sql`${rooms.revision} + 1`, updatedAt: Date.now(),
      }).where(eq(rooms.code, room.code)).returning();
    }
    return snapshot(tx, updated);
  });
}

export async function updateRoom(db: Database, code: string, body: { hostId: string; config?: RoomConfig; result?: unknown }) {
  return db.transaction(async (tx) => {
    const room = await lockedRoom(tx, code);
    if (body.hostId !== room.hostId) throw new RoomError("HOST_ONLY", 403);
    if (!body.config) throw new RoomError("CONFIG_REQUIRED", 400);
    const requestedBots = Number(body.config.bots || 0);
    const [members] = await tx.select({ total: count() }).from(roomMembers).where(eq(roomMembers.roomCode, room.code));
    const bots = Number.isFinite(requestedBots)
      ? Math.max(0, Math.min(6 - members.total, Math.floor(requestedBots))) : 0;
    // Under the lock, omitted results retain the latest committed state.
    const stateJson = Object.prototype.hasOwnProperty.call(body, "result")
      ? (body.result ? JSON.stringify(body.result) : "") : room.stateJson;
    const [updated] = await tx.update(rooms).set({
      configJson: JSON.stringify({ ...body.config, bots }), stateJson,
      revision: sql`${rooms.revision} + 1`, updatedAt: Date.now(),
    }).where(eq(rooms.code, room.code)).returning();
    return snapshot(tx, updated);
  });
}
