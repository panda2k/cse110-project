import express from 'express';
import 'dotenv/config'; // Automatically loads environment variables from .env file
import cors from 'cors';
import { userRoutes } from './routes/users';
import authRoutes from './routes/auth';

const PORT = process.env.PORT || 8080; // Default to port 8080 if not specified in .env
const app = express();
let server; // Declare server in the outer scope

(async () => {
  try {

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use('/users', userRoutes);
    app.use('/api/auth', authRoutes);

    // Start the server
    server = app.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error during database initialization:', error);
    process.exit(1); // Exit process on failure
  }
})();

// Export app and server for testing or other purposes
export { app, server };