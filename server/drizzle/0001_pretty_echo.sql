PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user_events` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`userId` integer NOT NULL,
	`eventId` text(255) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user_events`("id", "userId", "eventId") SELECT "id", "userId", "eventId" FROM `user_events`;--> statement-breakpoint
DROP TABLE `user_events`;--> statement-breakpoint
ALTER TABLE `__new_user_events` RENAME TO `user_events`;--> statement-breakpoint
PRAGMA foreign_keys=ON;