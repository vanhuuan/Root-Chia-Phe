CREATE TABLE `room_members` (
	`room_code` text NOT NULL,
	`user_id` text NOT NULL,
	`display_name` text NOT NULL,
	`faction_id` text,
	`joined_at` integer NOT NULL,
	PRIMARY KEY(`room_code`, `user_id`),
	FOREIGN KEY (`room_code`) REFERENCES `rooms`(`code`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_room_members_room_code` ON `room_members` (`room_code`);--> statement-breakpoint
CREATE TABLE `rooms` (
	`code` text PRIMARY KEY NOT NULL,
	`host_id` text NOT NULL,
	`title` text NOT NULL,
	`config_json` text NOT NULL,
	`state_json` text NOT NULL,
	`revision` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
