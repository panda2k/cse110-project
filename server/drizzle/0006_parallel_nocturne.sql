CREATE TABLE `organizations` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password` text,
	`google_id` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `organizations_username_unique` ON `organizations` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `organizations_google_id_unique` ON `organizations` (`google_id`);--> statement-breakpoint
CREATE TABLE `students` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password` text,
	`google_id` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `students_username_unique` ON `students` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `students_google_id_unique` ON `students` (`google_id`);--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user_events` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`eventId` text(255) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_user_events`("id", "userId", "eventId") SELECT "id", "userId", "eventId" FROM `user_events`;--> statement-breakpoint
DROP TABLE `user_events`;--> statement-breakpoint
ALTER TABLE `__new_user_events` RENAME TO `user_events`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `events` ADD `time` text(255) NOT NULL;