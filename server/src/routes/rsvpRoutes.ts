import { Router, Request } from "express";
import { drizzleDb as db } from "../db/db";
import { eq, desc, and } from "drizzle-orm";
import { userEvents, events, students } from "../db/schema";

const rsvpRoutes = Router();

// RSVP to an event

rsvpRoutes.post("", async (req: Request<{}, {}, { userId: number; eventId: string }>, res) => {
    try {
        const { userId, eventId } = req.body;
        console.log("Request Body:", req.body);
        await db.insert(userEvents).values({
            userId: req.body.userId,
            eventId: req.body.eventId
        });
        res.status(200).send({ message: "Event posted successfully!" });
        // // Check if the user already RSVPed
        // const eventExists = await db.select().from(events).where(eq(events.id, eventId));
        // if (!eventExists) {
        //     await db.insert(userEvents).values({ userId, eventId });
        // }
        // const userExists = await db.select().from(events).where(eq(students.id, Number(userId)));
        // if (!userExists) {
        //     await db.insert(userEvents).values({ userId, eventId });
        // } else {
        //     const existingRSVP = await db.select().from(userEvents)
        //         .where(eq(userEvents.userId, userId) && eq(userEvents.eventId, eventId));
        //     if (existingRSVP.length > 0) {
        //         res.status(400).send({ error: "User already RSVPed to this event." });
        //     }
        //     else {
        //         await db.insert(userEvents).values({ userId, eventId });
        //     }
        // }
        // res.status(200).send({ message: "RSVP successful!" });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).send({ error: "Failed to create event" });
    }
});

// Remove RSVP from an event
rsvpRoutes.delete("/", async (req: Request<{}, {}, { userId: string; eventId: string }>, res) => {
    try {
        const { userId, eventId } = req.body;

        // Remove RSVP from the database
        await db.delete(userEvents)
            .where(eq(userEvents.eventId, eventId) && eq(userEvents.userId, Number(userId)));

        res.status(200).send({ message: "RSVP removed successfully!" });
    } catch (error) {
        console.error("Error removing RSVP:", error);
        res.status(500).send({ error: "Failed to remove RSVP" });
    }
});

// Check if rsvp exists for an event user pair
rsvpRoutes.get("/queryElement/:eventId/:userId", async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const userId = req.params.userId;

        // Fetch all specific event for user and event.
        const upcomingEvents = await db.select()
            .from(userEvents)
            .where(
                and(
                    eq(userEvents.userId, Number(userId)),
                    eq(userEvents.eventId, eventId)
                )
            );

        if (upcomingEvents.length === 0) {
            res.json({});
        } else {
            res.json(upcomingEvents[0]);
        }
    } catch (error) {
        console.error("Error fetching rsvp user pair:", error);
        res.status(500).send({ error: "Failed to fetch rsvp" });
    }
});

rsvpRoutes.get("/upcoming/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        // Fetch all events for the user
        const upcomingEvents = await db.select()
            .from(events)
            .innerJoin(userEvents, eq(events.id, userEvents.eventId))
            .where(eq(userEvents.userId, Number(userId)))
            .orderBy(desc(events.date)); // Sort by date


        res.json(upcomingEvents);
    } catch (error) {
        console.error("Error fetching user's upcoming events:", error);
        res.status(500).send({ error: "Failed to fetch user's upcoming events" });
    }
});

export { rsvpRoutes };
