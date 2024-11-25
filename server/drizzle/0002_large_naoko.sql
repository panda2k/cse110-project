ALTER TABLE `messages` RENAME COLUMN "authorId" TO "author";--> statement-breakpoint
DROP INDEX IF EXISTS "organizations_username_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "organizations_google_id_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "students_username_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "students_google_id_unique";--> statement-breakpoint
ALTER TABLE `messages` ALTER COLUMN "author" TO "author" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `organizations_username_unique` ON `organizations` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `organizations_google_id_unique` ON `organizations` (`google_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `students_username_unique` ON `students` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `students_google_id_unique` ON `students` (`google_id`);