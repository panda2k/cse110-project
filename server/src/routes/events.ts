import { Request, Router } from "express";
import { db } from "../db/db";
import { events, userEvents } from "../db/schema";
import { desc, eq, InferSelectModel } from "drizzle-orm";

export const eventRoutes = Router();

eventRoutes.post("", async (req: Request<{}, {}, { title: string, location: string, description: string, date: string }>, res) => {
    try {
        console.log("Request Body:", req.body);
        await db.insert(events).values({
            title: req.body.title,
            location: req.body.location,
            description: req.body.description,
            date: req.body.date,
        });
        res.status(200).send({ message: "Event created successfully!" });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).send({ error: "Failed to create event" });
    }
});

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

/**
 * GET: Retrieve events specific to a user (Optional - only if user-specific events are needed)
 * Requires `userId` query parameter.
 */
// eventRoutes.get("/user", async (req, res) => {
//     const userId = req.query.userId as string;

//     if (!userId) {
//         res.status(400).send({ error: "Missing userId query parameter" });
//         return;
//     }

//     try {
//         const userEvents = await db.select().from(events).where(eq(events.userId, userId)).orderBy(desc(events.date));
//         res.json(userEvents);
//     } catch (error) {
//         console.error("Error retrieving user events:", error);
//         res.status(500).send({ error: "Failed to retrieve user events" });
//     }
// });

eventRoutes.put("/:eventId", async (req: Request<{ eventId: string }, {}, { title: string; description: string; date: number, location: string }>, res) => {
    const { eventId } = req.params;
    const { title, description, date, location } = req.body;

    if (!title && !description && !date && !location) {
        res.status(400).send({ error: "No fields to update" });
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