import { body } from "express-validator";

export const createGreetingValidations = [
  body("name", "Name is required").notEmpty(),
  body("description", "Description must have six or more characters").isLength({
    min: 6,
  }),
];

export const updateGreetingValidations = [
  body("_id", "Id is required").notEmpty(),
  body("name", "Name is required").notEmpty(),
  body("description", "Description must have six or more characters").isLength({
    min: 6,
  }),
];

export const deleteGreetingValidations = [
  body("_id", "Id is required").notEmpty(),
];
