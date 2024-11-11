import { relations, sql } from "drizzle-orm";
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

// Define the `students` table
export const students = sqliteTable('students', {
  id: integer('id').primaryKey().notNull(), // Primary key and implicitly auto-incremented
  username: text('username').notNull().unique(),
  password: text('password'), // Nullable for Google sign-ins
  google_id: text('google_id').unique(),
  created_at: text('created_at').default('CURRENT_TIMESTAMP'),
});

export const events = sqliteTable("events", {
    id: text("id", { length: 255 })
        .notNull()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title", { length: 255 }).notNull(),
    description: text("description", { length: 10000 }).notNull(),
    date: int("date", { mode: "timestamp" }).notNull()
});

export const users = sqliteTable("events", {
    id: text("id", { length: 255 })
        .notNull()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name", { length: 255 }).notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
    messages: many(messages)
}))

export const messages = sqliteTable("events", {
    id: text("id", { length: 255 })
        .notNull()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    content: text("content", { length: 10000 }).notNull(),
    date: int("date", { mode: "timestamp" })
        .notNull()
        .default(sql`(current_timestamp)`),
    authorId: text("authorId", { length: 255 }).notNull(),
    recipientId: text("recipientId", { length: 255 }).notNull(),
});

export const messageRelations = relations(messages, ({ one }) => ({
    user: one(users, {
        fields: [messages.authorId, messages.recipientId],
        references: [users.id, users.id],
    }),
}));


// Define the `organizations` table
export const organizations = sqliteTable('organizations', {
  id: integer('id').primaryKey().notNull(), // Primary key and implicitly auto-incremented
  username: text('username').notNull().unique(),
  password: text('password'), // Nullable for Google sign-ins
  google_id: text('google_id').unique(),
  created_at: text('created_at').default('CURRENT_TIMESTAMP'),
});