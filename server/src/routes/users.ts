import { Request, Response, Router } from "express";
import { db } from "../db/db";
import { users } from "../db/schema";

export const userRoutes = Router();

userRoutes.get("", (req, res) => {
    res.json([])
})

userRoutes.post("", async (req, res) => {
    const { firstName, lastName, userName } = req.body as { firstName:string, lastName:string, userName:string };
    if (!firstName || !lastName || !userName) {
        res.status(400).send({ error: "Missing required fields" });
    } else {
        try {
            const user = await db.insert(users).values(req.body).returning();
            res.status(201).json({user});
        } catch (error) {
            console.log(error);
            res.status(500).send({data: error});
        }
    }
}) 

userRoutes.post("/users/rsvp/:id", (req, res) => {

})
