import express from "express";
import 'dotenv/config';
import { userRoutes } from "./routes/users";
import { eventRoutes } from "./routes/events";
import { rsvpRoutes } from "./routes/rsvpRoutes";

const port = 8080;
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/rsvp", rsvpRoutes);

