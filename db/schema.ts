import { integer, index, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const rooms = sqliteTable("rooms", {
  code: text("code").primaryKey(),
  hostId: text("host_id").notNull(),
  title: text("title").notNull(),
  configJson: text("config_json").notNull(),
  stateJson: text("state_json").notNull(),
  revision: integer("revision").notNull().default(0),
  createdAt: integer("created_at").notNull(),
  updatedAt: integer("updated_at").notNull(),
});

export const roomMembers = sqliteTable("room_members", {
  roomCode: text("room_code").notNull().references(() => rooms.code),
  userId: text("user_id").notNull(),
  displayName: text("display_name").notNull(),
  factionId: text("faction_id"),
  joinedAt: integer("joined_at").notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.roomCode, table.userId] }),
  byRoom: index("idx_room_members_room_code").on(table.roomCode),
}));
