import express, { Request, Response, Router } from "express";
import dotenv from "dotenv";
import User from "../models/user.models";
import { checkIdValid } from "../middlewares/utils.middleware";

const router = express.Router();
dotenv.config();

router.use(express.json());

// GET
router.get("/", async (req: Request, res: Response) => {
  try {
    const findAll = await User.find({});
    if (findAll) {
      return res.status(200).json(findAll);
    }
  } catch (error) {
    return res.status(400).json({ error_message: error });
  }
});

router.get("/:id", checkIdValid, async (req: Request, res: Response) => {
  try {
    const findByID = await User.findById(res.locals.id);
    if (findByID) {
      return res.status(200).json(findByID);
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res.status(400).json({ error_message: error });
  }
});

// DELETE
router.delete("/:id", (req: Request, res: Response) => {});

export default router;
