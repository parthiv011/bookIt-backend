import { Request, Response } from "express";
import { Router } from "express";
import { router as userRouter } from "./user";

const router = Router();

router.get("/api/v1", (req: Request, res: Response) => {
  res.json("Welcome to api!");
});

router.use("/user", userRouter);
