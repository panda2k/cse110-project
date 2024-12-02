import { Router } from "express";
import { drizzleDb as db } from "../db/db";
import { events } from "../db/schema";
import { sql } from "drizzle-orm";

export const eventRoutes = Router();

eventRoutes.get("", async (req, res) => {
    try {
        // Fetch events from the database and await the result
        const items = await db.select().from(events);

        // Transform results into plain JSON objects
        const plainItems = items.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            date: new Date(Number(item.date) * 1000).toISOString(),
            organizationId: item.organizationId,
            Poster: item.image,
            tags: item.tags ? item.tags.split(",").map(tag => tag.trim()) : [],
        }));

        res.json(plainItems);
    } catch (error) {
        console.error("Error Fetching Events:", error);
        res.status(500).json({ error: "Failed to Fetch Events" });
    }
});

//Used for testing, not necessary.

//eventRoutes.post ("", async(req,res) =>{
//    const { title, description, date, Poster, tags } = req.body as {
//        title: string;
//        description: string;
//        date: string;
//        organizationId: string;
//        Poster: string;
//        tags?: string; // Optional
//    };
//
//    try{
//        //Format the date as unix timestamp
//        const formattedDate = Math.floor(new Date(date).getTime() / 1000);
//
//        // Create a new event object matching the schema
//        const newEvent = {
//            title,
//            description,
//            date: sql`${formattedDate}`, // Store as a Unix timestamp
//            image: Poster,       // Rename Poster to image
//            organizationId,
//            tags,                // Store tags as a string (comma-separated)
//        };
//
//        // Insert the event into the database
//        const insertedEvent = await db.insert(events).values(newEvent).returning();
//
//        res.status(201).json({
//            message: "Event added successfully",
//            event: insertedEvent,
//        });
//    } catch (error) {
//        console.error("Error Adding Event:", error);
//        res.status(500).json({ error: "Failed to Add Event" });
//    }
//})
//
//