import { relations, sql } from "drizzle-orm";
import { sqliteTable, integer, text, int } from 'drizzle-orm/sqlite-core';

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

