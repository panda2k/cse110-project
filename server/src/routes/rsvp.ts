import { Router, Request, Response } from "express";
import { db } from "../db/db";
import { users, events, rsvp } from "../db/schema";
import { and, eq } from "drizzle-orm";

export const rsvpRoutes = Router();

// RSVP for an event
rsvpRoutes.post("", async (req, res) => {
    const { eventId, userName } = req.body as { eventId: string; userName: string };


    try {
        // Fetch the user associated with the username
        const currUser = await db.select().from(users).where(eq(users.userName, userName));

        if (currUser.length === 0) {
            // User does not exist
            res.status(400).send({ error: "User doesn't exist" });
            return;
        }

        // Check if RSVP already exists
        const existsResult = await db
            .select()
            .from(rsvp)
            .where(
                and(eq(rsvp.userId, currUser[0].id), eq(rsvp.eventId, eventId))
            );

        if (existsResult.length > 0) {
            // RSVP already exists
            res.status(200).send({ data: "RSVP already exists" });
            return;
        }

        // Insert new RSVP
        const rsvpdb = await db.insert(rsvp).values({
            eventId,
            userId: currUser[0].id,
        });

        res.status(201).json({ message: "RSVP created successfully"});
    } catch (error) {
        console.error("Error creating RSVP:", error);
        res.status(500).send({ error: "Failed to create RSVP", details: error });
    }
});
// Get RSVPs for a specific user
//Change this later to get current logged in user
rsvpRoutes.get("/:userName", async (req: Request<{ userName: string }>, res) => {
    const { userName } = req.params;

    try {
        // Fetch the user associated with the username
        const currUser = await db.select().from(users).where(eq(users.userName, userName));

        if (currUser.length === 0) {
            // User does not exist
            res.status(400).send({ error: "User doesn't exist" });
            return;
        }

        // Fetch RSVPs for the user
        const userRsvps = await db
            .select({
                eventId: rsvp.eventId,
                userId: rsvp.userId,
                eventTitle: events.title,
                eventDescription: events.description,
                eventDate: events.date,
            })
            .from(rsvp)
            .innerJoin(events, eq(rsvp.eventId, events.id))
            .where(eq(rsvp.userId, currUser[0].id));

        res.status(200).json(userRsvps);
    } catch (error) {
        console.error("Error fetching RSVPs:", error);
        res.status(500).send({ error: "Failed to fetch RSVPs", details: error });
    }
});

// Delete an RSVP for a user and event
rsvpRoutes.delete("", async (req, res) => {
    const { eventId, userName } = req.body as { eventId: string; userName: string };

    try {
        // Fetch the user associated with the username
        const currUser = await db.select().from(users).where(eq(users.userName, userName));

        if (currUser.length === 0) {
            // User does not exist
            res.status(400).send({ error: "User doesn't exist" });
            return;
        }

        // Delete the RSVP and return the deleted row
        const deletedRsvp = await db
            .delete(rsvp)
            .where(
                and(eq(rsvp.userId, currUser[0].id), eq(rsvp.eventId, eventId))
            )
            .returning();

        if (deletedRsvp.length > 0) {
            res.status(200).json({ message: "RSVP deleted successfully" });
        } else {
            res.status(404).json({ error: "RSVP not found" });
        }
    } catch (error) {
        console.error("Error deleting RSVP:", error);
        res.status(500).send({ error: "Failed to delete RSVP", details: error });
    }
});
