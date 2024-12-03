import express from "express";
import 'dotenv/config';
import { userRoutes } from "./routes/users";
import { eventRoutes } from "./routes/events";
import { rsvpRoutes } from "./routes/rsvpRoutes";
import authRoutes from './routes/auth';
import { messageRoutes } from "./routes/messages";

const PORT = process.env.PORT || 8080; // Default to port 8080 if not specified in .env
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/rsvp", rsvpRoutes);
app.use('/api/auth', authRoutes);
app.use("/messages", messageRoutes);

// Start the server
const server = app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

// Export app and server for testing or other purposes
export { app, server };

