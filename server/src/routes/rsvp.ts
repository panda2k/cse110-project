import { Router, Request, Response } from "express";
import { db } from "../db/db";
import { users, events, rsvp } from "../db/schema";
import { and, eq } from "drizzle-orm";

export const rsvpRoutes = Router();

// RSVP for an event
rsvpRoutes.post("", async (req: Request, res: Response) => {
    const { eventId, userName } = req.body as { eventId: string; userName: string };

    // Validate request body
    if (!eventId || !userName) {
        res.status(400).send({ error: "Missing required fields" });
        return;
    }

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

        res.status(201).json({ message: "RSVP created successfully", rsvp: rsvpdb });
    } catch (error) {
        console.error("Error creating RSVP:", error);
        res.status(500).send({ error: "Failed to create RSVP", details: error });
    }
});
