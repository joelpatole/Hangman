"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADD_NEW_WORD_VALIDATOR = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.ADD_NEW_WORD_VALIDATOR = [
    (0, express_validator_1.body)("word").exists().withMessage("word is required"),
    (0, express_validator_1.body)("difficulty").exists().withMessage("difficulty level is required"),
    (0, express_validator_1.body)("category").exists().withMessage("category is required"),
    validate_1.validate
];
//# sourceMappingURL=word.validations.js.map