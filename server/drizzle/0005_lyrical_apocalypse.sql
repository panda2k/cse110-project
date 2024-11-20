ALTER TABLE `events` ALTER COLUMN "date" TO "date" text(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `events` ADD `location` text(5000) NOT NULL;--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `userId`;