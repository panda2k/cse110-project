import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const initDatabase = async () => {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT,             -- Made nullable to accommodate Google sign-ins
      google_id TEXT UNIQUE,     -- Added google_id column
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS organizations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT,             -- Made nullable to accommodate Google sign-ins
      google_id TEXT UNIQUE,     -- Added google_id column
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return db;
};