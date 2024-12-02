import { Router } from "express";
import { db } from "../db/db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const userRoutes = Router();

// Get all users
// Get a specific user by username
userRoutes.get("", (req, res) => {
    res.json([])
})

userRoutes.get("/testroute", (req, res) => {
    res.status(200).send({data:"test received"});
})
