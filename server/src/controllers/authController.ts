import { OAuth2Client } from 'google-auth-library';
import { RequestHandler } from 'express';
import { initDatabase } from '../db/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Added for JWT token generation

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const dbPromise = initDatabase();

// Normal Signup Function
export const signup: RequestHandler = async (req, res): Promise<void> => {
  console.log("Entering normal signup function...");

  const { username, password, type } = req.body;
  console.log("Received request body:", { username, password, type });

  // Validate input
  if (!username || !password || !type) {
    console.warn("Missing username, password, or account type.");
    res.status(400).json({ message: 'Username, password, and account type are required.' });
    return;
  }

  if (!['student', 'organization'].includes(type)) {
    console.warn("Invalid account type:", type);
    res.status(400).json({ message: 'Invalid account type.' });
    return;
  }

  try {
    const db = await dbPromise;
    console.log("Connected to the database successfully.");

    // Check if the user already exists
    const tableName = type === 'student' ? 'students' : 'organizations';
    console.log(`Checking for existing user in ${tableName}...`);
    const existingUser = await db.get(`SELECT * FROM ${tableName} WHERE username = ?`, [username]);

    if (existingUser) {
      console.warn("User already exists in the database:", existingUser);
      res.status(409).json({ message: 'User already exists.' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully.");

    // Insert new user
    console.log(`Inserting new ${type} into the database.`);
    await db.run(
      `INSERT INTO ${tableName} (username, password) VALUES (?, ?)`,
      [username, hashedPassword]
    );

    console.log(`New ${type} successfully added to the database with username: ${username}`);
    res.status(201).json({ message: 'Account created successfully.' });
    return;
  } catch (error) {
    console.error("Error during normal signup:", error);
    res.status(500).json({ message: 'Internal server error.' });
    return;
  }
};

// Google Signup Function
export const googleSignup: RequestHandler = async (req, res): Promise<void> => {
  console.log("Entering googleSignup function...");

  const { token, type } = req.body;
  console.log("Received request body:", { token, type });

  // Validate input
  if (!token || !type) {
    console.warn("Missing token or account type.");
    res.status(400).json({ message: 'Token and account type are required.' });
    return;
  }

  if (!['student', 'organization'].includes(type)) {
    console.warn("Invalid account type:", type);
    res.status(400).json({ message: 'Invalid account type.' });
    return;
  }

  try {
    console.log("Verifying Google token...");
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("Google Payload received:", payload);

    if (!payload) {
      console.warn("Invalid Google token payload.");
      res.status(400).json({ message: 'Invalid Google token.' });
      return;
    }

    const email = payload.email;
    const name = payload.name || 'Unknown';
    const googleId = payload.sub;
    console.log(`Extracted email: ${email}, name: ${name}, googleId: ${googleId}`);

    const db = await dbPromise;
    console.log("Connected to the database successfully.");

    // Check if the user already exists
    const tableName = type === 'student' ? 'students' : 'organizations';
    console.log(`Checking for existing user in ${tableName}...`);
    const existingUser = await db.get(`SELECT * FROM ${tableName} WHERE username = ?`, [email]);

    if (existingUser) {
      console.warn("User already exists in the database:", existingUser);
      res.status(409).json({ message: 'User already exists.' });
      return;
    }

    // Insert new user
    console.log(`Inserting new ${type} into the database.`);
    await db.run(
      `INSERT INTO ${tableName} (username, password, google_id) VALUES (?, ?, ?)`,
      [email, '', googleId]
    );

    console.log(`New ${type} successfully added to the database with email: ${email}`);
    res.status(201).json({ message: 'Account created successfully.' });
    return;
  } catch (error) {
    console.error("Error during Google signup:", error);
    res.status(500).json({ message: 'Internal server error.' });
    return;
  }
};

// Normal Login Function
export const login: RequestHandler = async (req, res): Promise<void> => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    console.warn("Missing username or password.");
    res.status(400).json({ message: 'Username and password are required.' });
    return;
  }

  try {
    const db = await dbPromise;

    // Check in both students and organizations tables
    const student = await db.get('SELECT * FROM students WHERE username = ?', [username]);
    const organization = await db.get('SELECT * FROM organizations WHERE username = ?', [username]);

    const user = student || organization;
    const userType = student ? 'student' : organization ? 'organization' : null;

    if (!user) {
      console.warn("User not found with username:", username);
      res.status(401).json({ message: 'Invalid username or password.' });
      return;
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      console.warn("Password mismatch for user:", username);
      res.status(401).json({ message: 'Invalid username or password.' });
      return;
    }

    // Ensure JWT secret is set
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET is not set in environment variables.');
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, type: userType },
      jwtSecret,
      { expiresIn: '1h' }
    );

    console.log(`User ${username} logged in successfully.`);
    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Google Login Function
export const googleLogin: RequestHandler = async (req, res): Promise<void> => {
  const { token, type } = req.body;

  // Validate input
  if (!token || !type) {
    console.warn("Missing token or account type.");
    res.status(400).json({ message: 'Token and account type are required.' });
    return;
  }

  if (!['student', 'organization'].includes(type)) {
    console.warn("Invalid account type:", type);
    res.status(400).json({ message: 'Invalid account type.' });
    return;
  }

  try {
    console.log("Verifying Google token...");
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("Google Payload received:", payload);

    if (!payload) {
      console.warn("Invalid Google token payload.");
      res.status(400).json({ message: 'Invalid Google token.' });
      return;
    }

    const email = payload.email;
    const googleId = payload.sub;
    console.log(`Extracted email: ${email}, googleId: ${googleId}`);

    const db = await dbPromise;
    console.log("Connected to the database successfully.");

    // Check if user exists
    const tableName = type === 'student' ? 'students' : 'organizations';
    console.log(`Checking for existing user in ${tableName}...`);
    const user = await db.get(`SELECT * FROM ${tableName} WHERE google_id = ?`, [googleId]);

    if (!user) {
      console.warn("User not found in the database with googleId:", googleId);
      res.status(404).json({ message: 'User not found. Please sign up first.' });
      return;
    }

    // Ensure JWT secret is set
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET is not set in environment variables.');
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { id: user.id, username: user.username, type },
      jwtSecret,
      { expiresIn: '1h' }
    );

    console.log(`User ${email} logged in successfully via Google.`);
    res.status(200).json({ message: 'Login successful.', token: jwtToken });
  } catch (error) {
    console.error('Error during Google login:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};