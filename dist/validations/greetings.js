"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGreetingValidations = exports.updateGreetingValidations = exports.createGreetingValidations = void 0;
const express_validator_1 = require("express-validator");
exports.createGreetingValidations = [
    (0, express_validator_1.body)("name", "Name is required").notEmpty(),
    (0, express_validator_1.body)("description", "Description must have six or more characters").isLength({
        min: 6,
    }),
];
exports.updateGreetingValidations = [
    (0, express_validator_1.body)("_id", "Id is required").notEmpty(),
    (0, express_validator_1.body)("name", "Name is required").notEmpty(),
    (0, express_validator_1.body)("description", "Description must have six or more characters").isLength({
        min: 6,
    }),
];
exports.deleteGreetingValidations = [
    (0, express_validator_1.body)("_id", "Id is required").notEmpty(),
];
