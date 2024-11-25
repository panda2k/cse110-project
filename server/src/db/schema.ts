import { relations, sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const events = sqliteTable("events", {
    id: text("id", { length: 255 })
        .notNull()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title", { length: 255 }).notNull(),
    description: text("description", { length: 10000 }).notNull(),
    date: text("date", { length: 255 }).notNull(),
    location: text("location", { length: 5000 }).notNull()
});

// export const users = sqliteTable("users", {
//     id: text("id", { length: 255 })
//         .notNull()
//         .primaryKey()
//         .$defaultFn(() => crypto.randomUUID()),
//     name: text("name", { length: 255 }).notNull(),
// });

// export const userRelations = relations(users, ({ many }) => ({
//     messages: many(messages)
// }))

// export const messages = sqliteTable("events", {
//     id: text("id", { length: 255 })
//         .notNull()
//         .primaryKey()
//         .$defaultFn(() => crypto.randomUUID()),
//     content: text("content", { length: 10000 }).notNull(),
//     date: int("date", { mode: "timestamp" })
//         .notNull()
//         .default(sql`(current_timestamp)`),
//     authorId: text("authorId", { length: 255 }).notNull(),
//     recipientId: text("recipientId", { length: 255 }).notNull(),
// });

// export const messageRelations = relations(messages, ({ one }) => ({
//     user: one(users, {
//         fields: [messages.authorId, messages.recipientId],
//         references: [users.id, users.id],
//     }),
// }));

export const userEvents = sqliteTable("user_events", {
    id: text("id", { length: 255 })
        .notNull()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId", { length: 255 })
        .notNull()
        .references(() => studentsTable.id, { onDelete: "cascade" }),
    eventId: text("eventId", { length: 255 })
        .notNull()
        .references(() => events.id, { onDelete: "cascade" }),
});

export const studentsTable = sqliteTable('students', {
    id: text('id').primaryKey().notNull(), // Primary key and implicitly auto-incremented
    username: text('username').notNull().unique(),
    password: text('password'), // Nullable for Google sign-ins
    google_id: text('google_id').unique(),
    created_at: text('created_at').default('CURRENT_TIMESTAMP'),
});

// Define the `organizations` table
export const organizationsTable = sqliteTable('organizations', {
    id: text('id').primaryKey().notNull(), // Primary key and implicitly auto-incremented
    username: text('username').notNull().unique(),
    password: text('password'), // Nullable for Google sign-ins
    google_id: text('google_id').unique(),
    created_at: text('created_at').default('CURRENT_TIMESTAMP'),
});