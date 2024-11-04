import { Router } from "express";

export const eventRoutes = Router();

eventRoutes.get("", (req, res) => {
    res.json([])
})

