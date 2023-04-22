import express from "express";
import {
  getGreetingsController,
  createGreetingController,
  updateGreetingController,
  deleteGreetingController,
} from "../controllers/greetings";
import {
  createGreetingValidations,
  updateGreetingValidations,
  deleteGreetingValidations,
} from "../validations/greetings";

const router = express.Router();

router.get("/", getGreetingsController);

router.post("/", createGreetingValidations, createGreetingController);

router.put("/", updateGreetingValidations, updateGreetingController);

router.delete("/", deleteGreetingValidations, deleteGreetingController);

export default router;
