CREATE TABLE "room_members" (
	"room_code" text NOT NULL,
	"user_id" text NOT NULL,
	"display_name" text NOT NULL,
	"faction_id" text,
	"joined_at" bigint NOT NULL,
	CONSTRAINT "room_members_room_code_user_id_pk" PRIMARY KEY("room_code","user_id")
);
--> statement-breakpoint
CREATE TABLE "rooms" (
	"code" text PRIMARY KEY NOT NULL,
	"host_id" text NOT NULL,
	"title" text NOT NULL,
	"config_json" text NOT NULL,
	"state_json" text NOT NULL,
	"revision" integer DEFAULT 0 NOT NULL,
	"created_at" bigint NOT NULL,
	"updated_at" bigint NOT NULL
);
--> statement-breakpoint
ALTER TABLE "room_members" ADD CONSTRAINT "room_members_room_code_rooms_code_fk" FOREIGN KEY ("room_code") REFERENCES "public"."rooms"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_room_members_room_code" ON "room_members" USING btree ("room_code");