import { OAuth2Client } from 'google-auth-library';
import { RequestHandler } from 'express';
import { eq } from 'drizzle-orm';
import { drizzleDb } from '../db/db'; // Ensure this points to your Drizzle instance
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Import tables
import { students, organizations } from '../db/schema'; // Ensure these are properly exported

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const getTable = (type: string) =>
  type === 'student' ? students : organizations;

// Normal Signup Function
export const signup: RequestHandler = async (req, res): Promise<void> => {
  const { username, password, type } = req.body;

  if (!username || !password || !type) {
    res.status(400).json({ message: 'Username, password, and account type are required.' });
    return;
  }

  if (!['student', 'organization'].includes(type)) {
    res.status(400).json({ message: 'Invalid account type.' });
    return;
  }

  try {
    const table = getTable(type);

    // Check if the user already exists
    const existingUser = await drizzleDb
      .select()
      .from(table)
      .where(eq(table.username, username))
      .then((rows) => rows[0]);

    if (existingUser) {
      res.status(409).json({ message: 'User already exists.' });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }

    // Hash the password and insert the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await drizzleDb.insert(table).values({
      username,
      password: hashedPassword,
    }).returning();

    const jwtToken = jwt.sign(
      { id: user.id, username: user.username, type },
      jwtSecret,
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'Account created successfully.', token: jwtToken });
  } catch (error) {
    console.error('Error during normal signup:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Google Signup Function
export const googleSignup: RequestHandler = async (req, res): Promise<void> => {
  const { token, type } = req.body;

  if (!token || !type) {
    res.status(400).json({ message: 'Token and account type are required.' });
    return;
  }

  if (!['student', 'organization'].includes(type)) {
    res.status(400).json({ message: 'Invalid account type.' });
    return;
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      res.status(400).json({ message: 'Invalid Google token.' });
      return;
    }

    const email = payload.email!;
    const googleId = payload.sub;
    const table = getTable(type);

    // Check if the user already exists
    const existingUser = await drizzleDb
      .select()
      .from(table)
      .where(eq(table.username, email))
      .then((rows) => rows[0]);

    if (existingUser) {
      res.status(409).json({ message: 'User already exists.' });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }

    // Insert the new user
    const [user] = await drizzleDb.insert(table).values({
      username: email,
      password: '', // Password is empty for Google accounts
      google_id: googleId,
    }).returning();


    const jwtToken = jwt.sign(
      { id: user.id, username: user.username, type },
      jwtSecret,
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'Account created successfully.', token: jwtToken });
  } catch (error) {
    console.error('Error during Google signup:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Normal Login Function
export const login: RequestHandler = async (req, res): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required.' });
    return;
  }

  try {
    const student = await drizzleDb
      .select()
      .from(students)
      .where(eq(students.username, username))
      .then((rows) => rows[0]);

    const organization = await drizzleDb
      .select()
      .from(organizations)
      .where(eq(organizations.username, username))
      .then((rows) => rows[0]);

    const user = student || organization;
    const userType = student ? 'student' : organization ? 'organization' : null;

    if (!user) {
      res.status(401).json({ message: 'Invalid username or password.' });
      return;
    }

    if (!user.password) {
      res.status(400).json({ message: 'Password is required for this account.' });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ message: 'Invalid username or password.' });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, type: userType },
      jwtSecret,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Google Login Function
export const googleLogin: RequestHandler = async (req, res): Promise<void> => {
  const { token, type } = req.body;

  if (!token || !type) {
    res.status(400).json({ message: 'Token and account type are required.' });
    return;
  }

  if (!['student', 'organization'].includes(type)) {
    res.status(400).json({ message: 'Invalid account type.' });
    return;
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      res.status(400).json({ message: 'Invalid Google token.' });
      return;
    }

    const googleId = payload.sub;
    const table = getTable(type);

    // Check if user exists
    const user = await drizzleDb
      .select()
      .from(table)
      .where(eq(table.google_id, googleId))
      .then((rows) => rows[0]);

    if (!user) {
      res.status(404).json({ message: 'User not found. Please sign up first.' });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }

    const jwtToken = jwt.sign(
      { id: user.id, username: user.username, type },
      jwtSecret,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful.', token: jwtToken });
  } catch (error) {
    console.error('Error during Google login:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
