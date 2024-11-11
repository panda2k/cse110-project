CREATE TABLE `events` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`title` text(255),
	`description` text(10000),
	`date` integer NOT NULL
);
