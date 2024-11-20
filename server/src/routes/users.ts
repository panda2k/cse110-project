import { Router } from "express";
import { db } from "../db/db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const userRoutes = Router();
//Change this later to use google authentication?
userRoutes.get("", (req, res) => {
    res.json([])
})

