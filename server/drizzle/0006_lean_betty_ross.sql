ALTER TABLE `events` ALTER COLUMN "title" TO "title" text(1000);--> statement-breakpoint
ALTER TABLE `events` ALTER COLUMN "date" TO "date" integer NOT NULL;