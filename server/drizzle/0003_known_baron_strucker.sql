DROP TABLE `user_events`;--> statement-breakpoint
ALTER TABLE `events` ADD `eventId` text(255) NOT NULL REFERENCES events(id);--> statement-breakpoint
ALTER TABLE `events` ALTER COLUMN "userId" TO "userId" text(255) NOT NULL REFERENCES users(id) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `title`;--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `description`;--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `date`;