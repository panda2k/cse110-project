import { Router } from "express";

export const userRoutes = Router();

userRoutes.get("", (req, res) => {
    res.json([])
});

userRoutes.get("/testroute", (req, res) => {
    res.status(200).send({data:"test received"});
})
