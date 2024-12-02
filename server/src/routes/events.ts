import { Request, Router } from "express";
import { drizzleDb as db } from "../db/db";
import { events, userEvents } from "../db/schema";
import { desc, eq, InferSelectModel } from "drizzle-orm";
import "multer";
import path from "path";

const multer = require('multer');
const upload = multer();

// app.post('/send', upload.any(), (req, res) => {
//     const formData = req.body;
//     console.log('form data', formData);
//     res.sendStatus(200);
// });

export const eventRoutes = Router();

eventRoutes.post("", upload.any(), async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);
        const formData = req.body;
        await db.insert(events).values({
            orgName: req.body.orgName,
            title: req.body.title,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            location: req.body.location,
            description: req.body.description,
            date: req.body.date,
            url: req.body.url,
            image: req.file?.path || null,
            orgID: req.body.orgID
        });
        res.status(200).send({ message: "Event created successfully!" });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).send({ error: "Failed to create event" });
    }
});

// eventRoutes.post("", async (req: Request<{}, {}, { orgName: string, title: string, location: string, description: string, date: string, startTime: string, endTime: string, image: string, url: string, orgID: string }>, res) => {
//     try {
//         console.log("Request Body:", req.body);
//         console.log("Uploaded File:", req.file);

//         await db.insert(events).values({
//             orgName: req.body.orgName,
//             title: req.body.title,
//             startTime: req.body.startTime,
//             endTime: req.body.endTime,
//             location: req.body.location,
//             description: req.body.description,
//             date: req.body.date,
//             url: req.body.url,
//             image: req.file?.path || null,
//             orgID: req.body.orgID
//         });
//         res.status(200).send({ message: "Event created successfully!" });
//     } catch (error) {
//         console.error("Error creating event:", error);
//         res.status(500).send({ error: "Failed to create event" });
//     }
// });

/**
 * GET: Retrieve all events
 */
eventRoutes.get("", async (req, res) => {
    try {
        const allEvents = await db.select().from(events).orderBy(desc(events.date));
        res.json(allEvents);
        return;
    } catch (error) {
        console.error("Error retrieving events:", error);
        res.status(500).send({ error: "Failed to retrieve events" });
    }
});

eventRoutes.get("/:orgID", async (req, res) => {
    const { orgID } = req.params;  // Get the orgID from the route parameters

    try {
        // Fetch events that match the given orgID
        const eventsByOrgID = await db.select().from(events).where(eq(events.orgID, orgID)).orderBy(desc(events.date));

        // Return the filtered events
        res.json(eventsByOrgID); // This is the final response, return it here
    } catch (error) {
        console.error("Error retrieving events:", error);
        // Ensure that an error response is sent only once
        if (!res.headersSent) {
            res.status(500).send({ error: "Failed to retrieve events" });
        }
    }
});

eventRoutes.put("/:eventId", async (req: Request<{ eventId: string }, {}, { title: string, location: string, description: string, date: string, startTime: string, endTime: string, url: string }>, res) => {
    const { eventId } = req.params;
    const { title, description, date, location, startTime, endTime, url } = req.body;

    if (!title && !description && !date && !location && !startTime && !endTime && !url) {
        // res.status(400).send({ error: "No fields to update" });
    }

    try {
        const event = await db.select().from(events).where(eq(events.id, eventId));
        if (event.length === 0) {
            res.status(404).send({ error: "Event not found" });
        }

        const updatedFields: any = {};
        if (title) updatedFields.title = title;
        if (location) updatedFields.location = location;
        if (description) updatedFields.description = description;
        if (date) updatedFields.date = date;
        if (startTime) updatedFields.startTime = startTime;
        if (endTime) updatedFields.endTime = endTime;
        if (url) updatedFields.url = url;

        await db.update(events).set(updatedFields).where(eq(events.id, eventId));

        res.status(200).send({ message: "Event updated successfully!" });
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).send({ error: "Failed to update event" });
    }
});

eventRoutes.delete("/:eventId", async (req: Request<{ eventId: string }>, res) => {
    const { eventId } = req.params;

    try {
        const event = await db.select().from(events).where(eq(events.id, eventId));
        if (event.length === 0) {
            res.status(404).send({ error: "Event not found" });
        }

        await db.delete(events).where(eq(events.id, eventId));

        res.status(200).send({ message: "Event deleted successfully!" });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).send({ error: "Failed to delete event" });
    }
});

eventRoutes.delete("/name/:eventName", async (req: Request<{ eventName: string }>, res) => {
    const { eventName } = req.params;

    try {
        // Check if the event with the given name exists
        const event = await db.select().from(events).where(eq(events.title, eventName));
        if (event.length === 0) {
            res.status(404).send({ error: "Event not found" });
            return;
        }

        // Delete the event by event name
        await db.delete(events).where(eq(events.title, eventName));

        res.status(200).send({ message: "Event deleted successfully!" });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).send({ error: "Failed to delete event" });
    }
});