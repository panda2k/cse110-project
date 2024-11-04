import express from "express";
import 'dotenv/config';

const port = 3000;
const app = express();

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
})

