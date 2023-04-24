import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Greeting from "../models/Greeting";

export const getGreetingsController = async (_req: Request, res: Response) => {
  try {
    const greeting = await Greeting.find();
    res.status(200).json(greeting);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

export const createGreetingController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, description } = req.body;
    let greeting = await Greeting.findOne({ name });
    if (greeting) {
      return res.status(409).json({
        errors: [{ message: "There is already a greeting with this name" }],
      });
    }

    greeting = new Greeting({
      name,
      description,
    });
    await greeting.save();

    res.status(200).json(greeting);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

export const updateGreetingController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, description, _id } = req.body;
    let greeting = await Greeting.findOne({
      _id,
    });
    if (!greeting) {
      return res.status(404).json({ message: "Greeting not found" });
    }

    greeting = await Greeting.findOneAndUpdate(
      { _id },
      { $set: { name, description } },
      { new: true }
    );

    res.status(200).json(greeting);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const deleteGreetingController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { _id } = req.body;
    const greeting = await Greeting.findOne({
      _id,
    });
    if (!greeting) {
      return res.status(404).json({ message: "Greeting not found" });
    }

    await Greeting.findOneAndRemove({ _id });

    res.status(200).json(greeting);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
