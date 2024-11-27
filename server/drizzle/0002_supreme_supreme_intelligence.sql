ALTER TABLE `events` ADD `startTime` text(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `events` ADD `endTime` text(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `events` ADD `image` text(5000);--> statement-breakpoint
ALTER TABLE `events` ADD `url` text(500);--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `time`;