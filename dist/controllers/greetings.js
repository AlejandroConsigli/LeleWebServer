"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGreetingController = exports.updateGreetingController = exports.createGreetingController = exports.getGreetingsController = void 0;
const express_validator_1 = require("express-validator");
const Greeting_1 = __importDefault(require("../models/Greeting"));
const getGreetingsController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const greeting = yield Greeting_1.default.find();
        res.status(200).json(greeting);
    }
    catch (err) {
        res.status(500).send("Server Error");
    }
});
exports.getGreetingsController = getGreetingsController;
const createGreetingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, description } = req.body;
        let greeting = yield Greeting_1.default.findOne({ name });
        if (greeting) {
            return res.status(409).json({
                errors: [{ message: "There is already a greeting with this name" }],
            });
        }
        greeting = new Greeting_1.default({
            name,
            description,
        });
        yield greeting.save();
        return res.status(200).json(greeting);
    }
    catch (err) {
        return res.status(500).send("Server error");
    }
});
exports.createGreetingController = createGreetingController;
const updateGreetingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, description, _id } = req.body;
        let greeting = yield Greeting_1.default.findOne({
            _id,
        });
        if (!greeting) {
            return res.status(404).json({ message: "Greeting not found" });
        }
        greeting = yield Greeting_1.default.findOneAndUpdate({ _id }, { $set: { name, description } }, { new: true });
        return res.status(200).json(greeting);
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Server Error");
    }
});
exports.updateGreetingController = updateGreetingController;
const deleteGreetingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { _id } = req.body;
        const greeting = yield Greeting_1.default.findOne({
            _id,
        });
        if (!greeting) {
            return res.status(404).json({ message: "Greeting not found" });
        }
        yield Greeting_1.default.findOneAndRemove({ _id });
        return res.status(200).json(greeting);
    }
    catch (err) {
        return res.status(500).send("Server Error");
    }
});
exports.deleteGreetingController = deleteGreetingController;
