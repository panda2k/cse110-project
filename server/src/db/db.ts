import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Turso client
const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const drizzleDb = drizzle(client);

// Create tables if they do not exist
export const initDatabase = async () => {
  console.log('Initializing database...');

  // Create `students` table
  await drizzleDb.$client.execute(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT,
      google_id TEXT UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Create `organizations` table
  await drizzleDb.$client.execute(`
    CREATE TABLE IF NOT EXISTS organizations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT,
      google_id TEXT UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('Database initialized and tables ensured.');
};