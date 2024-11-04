import { Router } from "express";
import { db } from "../db/db";
import { events } from "../db/schema";

export const eventRoutes = Router();

eventRoutes.get("", (req, res) => {
    const items = db.select().from(events);
    res.json(items)
})

