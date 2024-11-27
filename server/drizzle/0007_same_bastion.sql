ALTER TABLE `users` RENAME COLUMN "prefrences" TO "preferences";--> statement-breakpoint
ALTER TABLE `events` ALTER COLUMN "title" TO "title" text(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `events` ADD `tags` text(1000);