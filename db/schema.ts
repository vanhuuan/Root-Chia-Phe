import { bigint, integer, index, primaryKey, pgTable, text } from "drizzle-orm/pg-core";

export const rooms = pgTable("rooms", {
  code: text("code").primaryKey(),
  hostId: text("host_id").notNull(),
  title: text("title").notNull(),
  configJson: text("config_json").notNull(),
  stateJson: text("state_json").notNull(),
  revision: integer("revision").notNull().default(0),
  createdAt: bigint("created_at", { mode: "number" }).notNull(),
  updatedAt: bigint("updated_at", { mode: "number" }).notNull(),
});

export const roomMembers = pgTable("room_members", {
  roomCode: text("room_code").notNull().references(() => rooms.code),
  userId: text("user_id").notNull(),
  displayName: text("display_name").notNull(),
  factionId: text("faction_id"),
  joinedAt: bigint("joined_at", { mode: "number" }).notNull(),
}, (table) => [
  primaryKey({ columns: [table.roomCode, table.userId] }),
  index("idx_room_members_room_code").on(table.roomCode),
]);
