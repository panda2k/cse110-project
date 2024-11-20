CREATE TABLE `rsvps` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`eventId` text(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`firstName` text(255) NOT NULL,
	`lastName` text(255) NOT NULL,
	`userName` text(255) NOT NULL,
	`prefrences` text(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE `events` ALTER COLUMN "title" TO "title" text(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `events` ALTER COLUMN "description" TO "description" text(10000) NOT NULL;--> statement-breakpoint
ALTER TABLE `events` ADD `image` text(10000) NOT NULL;