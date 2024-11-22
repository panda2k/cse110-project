import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import cors from 'cors';


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());

app.use(express.json());

// Register routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});