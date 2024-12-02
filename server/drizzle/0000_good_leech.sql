CREATE TABLE `events` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`title` text(255) NOT NULL,
	`description` text(10000) NOT NULL,
	`date` integer NOT NULL,
	`organizationId` text(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`content` text(10000) NOT NULL,
	`date` integer DEFAULT (current_timestamp) NOT NULL,
	`studentId` integer NOT NULL,
	`organizationId` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `organizations` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password` text,
	`google_id` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `organizations_username_unique` ON `organizations` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `organizations_google_id_unique` ON `organizations` (`google_id`);--> statement-breakpoint
CREATE TABLE `students` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password` text,
	`google_id` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `students_username_unique` ON `students` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `students_google_id_unique` ON `students` (`google_id`);