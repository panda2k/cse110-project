import { Router } from "express";
import { db } from "../db/db";
import { users, events, rsvps } from "../db/schema";
import { and, eq, isNotNull } from "drizzle-orm";

export const rsvpRoutes = Router();

rsvpRoutes.get("/:id", async (req, res) => {
    const eventId = req.params.id;
    if (!eventId) {
        res.status(400).send({ error: "Missing required fields" });
    } else {
        try {
            // first select all rsvps matching the desired eventId.
            const sq = db.select({id:rsvps.userId}).from(rsvps).where(eq(rsvps.eventId, eventId)).as("sq");

            // from the above list, select all users which have rsvp'd to the event;
            const result = await db.select({
                firstName: users.firstName,
                lastName: users.lastName,
                userName: users.userName,
                userId: users.id
            }).from(users)
            .leftJoin(sq, eq(sq.id, users.id))
            .where(isNotNull(sq.id));
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send({data: error}); // 500 means internal server error
        }
    }
})

// NOTE: There is an assumption made about usernames that is currently not checked for:
// Usernames are assumed to be unique!
rsvpRoutes.post("", async (req, res) => { 
    const { eventId, userName } = req.body as { eventId:string, userName:string };
    // check elements are not empty/null;
    if (!eventId || !userName) {
        res.status(400).send({ error: "Missing required fields" });
    } else {
        try {
            // grabs the user associated with a username
            const currUser = await db.select().from(users).where(eq(users.userName, userName));

            if (currUser.length == 0) { // make sure user exists
                res.status(400).send({ error: "user doesn't exist" });
                return;
            }

            // checks if rsvp already exists in rsvp table
            const existsResult = await db.select().from(rsvps).where(
                and(
                    eq(rsvps.userId, currUser[0].id),
                    eq(rsvps.eventId, eventId)
                )
            )
            if (existsResult.length > 0) { // already exists case
                res.status(200).send({ data:"rsvp already exists" });
            } else { // inserting new entry case
                const obj : {eventId:string, userId:string} = { eventId, userId:currUser[0].id };
                const rsvp = await db.insert(rsvps).values(obj).returning();
                res.status(201).json({rsvp});
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({data: error});
        }
    }
})