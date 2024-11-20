CREATE TABLE `users` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user_events` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`eventId` text(255) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_user_events`("id", "userId", "eventId") SELECT "id", "userId", "eventId" FROM `user_events`;--> statement-breakpoint
DROP TABLE `user_events`;--> statement-breakpoint
ALTER TABLE `__new_user_events` RENAME TO `user_events`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `events` ADD `title` text(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `events` ADD `description` text(10000) NOT NULL;--> statement-breakpoint
ALTER TABLE `events` ADD `date` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `events` ADD `userId` text(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `name`;