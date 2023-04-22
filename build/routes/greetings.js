"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const greetings_1 = require("../controllers/greetings");
const greetings_2 = require("../validations/greetings");
const router = express_1.default.Router();
router.get("/", greetings_1.getGreetingsController);
router.post("/", greetings_2.createGreetingValidations, greetings_1.createGreetingController);
router.put("/", greetings_2.updateGreetingValidations, greetings_1.updateGreetingController);
router.delete("/", greetings_2.deleteGreetingValidations, greetings_1.deleteGreetingController);
exports.default = router;
