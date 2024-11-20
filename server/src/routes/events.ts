import { Router } from "express";
import { db } from "../db/db";
import { events } from "../db/schema";

export const eventRoutes = Router();

eventRoutes.get("", (req, res) => {
    try{
    const items = db.select().from(events);
    res.json(items);
    }catch(error){
        console.error("Error Fetching Events:", error);
        res.status(500).json({error: "Failed to Fetch Events"})
    }
})

