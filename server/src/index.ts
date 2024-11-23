import express from "express";
import 'dotenv/config';
import { userRoutes } from "./routes/users";
import { eventRoutes } from "./routes/events";

const port = 3000;
const app = express();

var server = app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use("/users", userRoutes);
app.use("/events", eventRoutes);

module.exports = { 
    app: app,
    server: server 
};
