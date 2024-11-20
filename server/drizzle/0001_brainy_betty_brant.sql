CREATE TABLE `user_events` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`eventId` text(255) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE events RENAME TO events_backup;
CREATE TABLE `events` (
    id TEXT PRIMARY KEY NOT NULL DEFAULT (uuid()),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date INTEGER NOT NULL,
    userId TEXT NOT NULL
);
DROP TABLE events_backup;