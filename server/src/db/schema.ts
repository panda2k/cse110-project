import { relations, sql } from "drizzle-orm";
import { sqliteTable, integer, text, int } from 'drizzle-orm/sqlite-core';
const crypto = require("crypto");

export const events = sqliteTable("events", {
    id: text("id", { length: 255 })
        .notNull()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title", { length: 255 }).notNull(),
    description: text("description", { length: 10000 }).notNull(),
    date: int("date", { mode: "timestamp" }).notNull(),
    organizationId: text("organizationId", { length: 255 }).notNull()
});

export const students = sqliteTable('students', {
    id: integer('id').primaryKey().notNull(), // Primary key and implicitly auto-incremented
    username: text('username').notNull().unique(),
    password: text('password'), // Nullable for Google sign-ins
    google_id: text('google_id').unique(),
    created_at: text('created_at').default('CURRENT_TIMESTAMP'),
});

export const studentRelations = relations(students, ({ many }) => ({
    messages: many(messages)
}));

export const organizations = sqliteTable('organizations', {
    id: integer('id').primaryKey().notNull(), // Primary key and implicitly auto-incremented
    username: text('username').notNull().unique(),
    password: text('password'), // Nullable for Google sign-ins
    google_id: text('google_id').unique(),
    created_at: text('created_at').default('CURRENT_TIMESTAMP'),
});

export const organizationRelations = relations(organizations, ({ many }) => ({
    messages: many(messages),
    events: many(events)
}));

export const messages = sqliteTable("messages", {
    id: text("id", { length: 255 })
        .notNull()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    content: text("content", { length: 10000 }).notNull(),
    date: int("date", { mode: "timestamp" })
        .notNull()
        .default(sql`(current_timestamp)`),
    studentId: integer("studentId").notNull(),
    organizationId: integer("organizationId").notNull(),
    author: text().$type<"student" | "organization">().notNull()
});

export const messageRelations = relations(messages, ({ one }) => ({
    student: one(students, {
        fields: [messages.studentId],
        references: [students.id],
    }),
    organization: one(organizations, {
        fields: [messages.organizationId],
        references: [organizations.id]
    })
}));


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