import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { connectionOptions } from "./connection.mjs";
import * as schema from "./schema";

const createDb = () => {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is required for room APIs.");
  const client = postgres(url, connectionOptions(url));
  return drizzle(client, { schema });
};
export type Database = ReturnType<typeof createDb>;
const globalDb = globalThis as typeof globalThis & { rootDb?: Database };
// Lazy pool: static pages/builds do not require secrets; survives dev hot reload.
export function getDb(): Database {
  return globalDb.rootDb ??= createDb();
}
