import express from "express";
import 'dotenv/config';
import { userRoutes } from "./routes/users";
import authRoutes from './routes/auth';
import cors from 'cors';
//import { eventRoutes } from "./routes/events";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

var server = app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

app.use("/users", userRoutes);
app.use('/api/auth', authRoutes);


module.exports = { 
    app: app,
    server: server 
};
