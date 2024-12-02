import express from 'express';
import 'dotenv/config'; // Automatically loads environment variables from .env file
import cors from 'cors';
import { userRoutes } from './routes/users';
import authRoutes from './routes/auth';
import { messageRoutes } from "./routes/messages";
import { eventRoutes } from './routes/events';

const PORT = process.env.PORT || 8080; // Default to port 8080 if not specified in .env
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);
app.use("/events", eventRoutes);

// Start the server
const server = app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});



