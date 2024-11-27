import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
const crypto = require("crypto");

export const events = sqliteTable("events", {
    id: text("id", { length: 255 })
        .notNull()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title", { length: 255 }).notNull(),
    description: text("description", { length: 10000 }).notNull(),
    date: int("date", { mode: "timestamp" }).notNull(),
    image: text("image", {length: 10000}).notNull(),
    tags: text("tags", {length: 1000})
})

export const rsvp = sqliteTable("rsvp", {
    id: text("id", { length: 255 })
        .notNull()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId", { length:255 }).notNull(),
    eventId: text("eventId", { length: 255 }).notNull()
})

export const users = sqliteTable("users", {
    id: text("id", { length: 255 })
        .notNull()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    firstName: text("firstName", { length: 255 }).notNull(),
    lastName: text("lastName", { length: 255 }).notNull(),
    userName: text("userName", { length: 255 }).notNull(),
    preferences: text("preferences", {length: 255}).notNull()
})