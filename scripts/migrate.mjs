import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import nextEnv from "@next/env";
import postgres from "postgres";
import { connectionOptions } from "../db/connection.mjs";

nextEnv.loadEnvConfig(process.cwd());
const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is required. Configure it before running migrations.");
  process.exit(1);
}
const directory = new URL("../drizzle/postgresql/", import.meta.url);
let client;
try {
  client = postgres(url, { ...connectionOptions(url), max: 1 });
  // Advisory lock serializes explicit deploy jobs; replicas never run this.
  await client.begin(async (tx) => {
    await tx`SELECT pg_advisory_xact_lock(724196351)`;
    await tx`CREATE SCHEMA IF NOT EXISTS drizzle`;
    await tx`CREATE TABLE IF NOT EXISTS drizzle.__drizzle_migrations (
      id SERIAL PRIMARY KEY, hash text NOT NULL, created_at bigint
    )`;
    const journal = JSON.parse(await readFile(new URL("meta/_journal.json", directory), "utf8"));
    const applied = await tx`SELECT hash, created_at FROM drizzle.__drizzle_migrations ORDER BY created_at`;
    for (const entry of journal.entries) {
      const sqlFile = (await readFile(new URL(`${entry.tag}.sql`, directory), "utf8")).replaceAll("\r\n", "\n");
      const hash = createHash("sha256").update(sqlFile).digest("hex");
      const previous = applied.find((row) => Number(row.created_at) === entry.when);
      if (previous) {
        if (previous.hash !== hash) throw new Error("An applied migration was modified");
        continue;
      }
      if (applied.some((row) => Number(row.created_at) > entry.when)) {
        throw new Error("A migration is missing before an already applied migration");
      }
      for (const statement of sqlFile.split("--> statement-breakpoint")) {
        if (statement.trim()) await tx.unsafe(statement);
      }
      await tx`INSERT INTO drizzle.__drizzle_migrations (hash, created_at) VALUES (${hash}, ${entry.when})`;
      console.log(`Applied ${entry.tag}`);
    }
  });
  console.log("PostgreSQL migrations complete.");
} catch {
  console.error("Migration failed; transaction rolled back. Check connectivity, permissions and migration history.");
  process.exitCode = 1;
} finally {
  await client?.end();
}
