CREATE TABLE `events` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`title` text(255) NOT NULL,
	`time` text(255) NOT NULL,
	`description` text(10000) NOT NULL,
	`date` text(255) NOT NULL,
	`location` text(5000) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`content` text(10000) NOT NULL,
	`date` integer DEFAULT (current_timestamp) NOT NULL,
	`studentId` integer NOT NULL,
	`organizationId` integer NOT NULL,
	`author` text NOT NULL
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
CREATE UNIQUE INDEX `students_google_id_unique` ON `students` (`google_id`);--> statement-breakpoint
CREATE TABLE `user_events` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`userId` integer NOT NULL,
	`eventId` text(255) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade
);
