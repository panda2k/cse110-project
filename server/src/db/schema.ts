import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

// Define the `students` table
export const studentsTable = sqliteTable('students', {
  id: integer('id').primaryKey().notNull(), // Primary key and implicitly auto-incremented
  username: text('username').notNull().unique(),
  password: text('password'), // Nullable for Google sign-ins
  google_id: text('google_id').unique(),
  created_at: text('created_at').default('CURRENT_TIMESTAMP'),
});

// Define the `organizations` table
export const organizationsTable = sqliteTable('organizations', {
  id: integer('id').primaryKey().notNull(), // Primary key and implicitly auto-incremented
  username: text('username').notNull().unique(),
  password: text('password'), // Nullable for Google sign-ins
  google_id: text('google_id').unique(),
  created_at: text('created_at').default('CURRENT_TIMESTAMP'),
});