import express from "express";
import 'dotenv/config';
import { userRoutes } from "./routes/users";
import { eventRoutes } from "./routes/events";
import { rsvpRoutes } from "./routes/rsvp"; 

const cors = require("cors");

const port = 3000;
const app = express();
app.use(cors());

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use(express.json());
app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/rsvp", rsvpRoutes);
