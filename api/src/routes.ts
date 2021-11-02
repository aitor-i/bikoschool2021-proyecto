import express, { Express, Request, Response, Router } from "express";
import low from "lowdb";
import DatabaseSchema from "DatabaseSchema";

export let routes = Router();

routes.get("/memes", (req: Request, res: Response) => {
  res.status(200).json(req.context.db.get("memes").take(50).value());
});
