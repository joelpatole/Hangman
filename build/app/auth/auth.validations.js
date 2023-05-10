"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGIN_VALIDATION = exports.EMPLOYEE_REGISTRATION_VALIDATOR = exports.USER_REGISTRATION_VALIDATOR = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../utility/validate");
exports.USER_REGISTRATION_VALIDATOR = [
    (0, express_validator_1.body)("name").exists().withMessage("name is required"),
    (0, express_validator_1.body)("email").exists().withMessage("email is required").isEmail().withMessage("email sould be a valid email"),
    (0, express_validator_1.body)("password").exists().withMessage("password is required").isLength({ min: 3 }).withMessage("length should be atleast 3"),
    (0, express_validator_1.body)("username").exists().withMessage("username is required").isLength({ min: 3 }).withMessage("length should be atleast 3"),
    validate_1.validate
];
exports.EMPLOYEE_REGISTRATION_VALIDATOR = [
    (0, express_validator_1.body)("name").exists().withMessage("name is required"),
    (0, express_validator_1.body)("email").exists().withMessage("email is required").isEmail().withMessage("email sould be a valid email"),
    (0, express_validator_1.body)("password").exists().withMessage("password is required").isLength({ min: 3 }).withMessage("length should be atleast 3"),
    (0, express_validator_1.body)("username").exists().withMessage("username is required").isLength({ min: 3 }).withMessage("length should be atleast 3"),
    (0, express_validator_1.body)('role').exists().withMessage("role is required"),
    validate_1.validate
];
exports.LOGIN_VALIDATION = [
    (0, express_validator_1.body)("email").exists().withMessage("email is required").isEmail().withMessage("email sould be a valid email"),
    (0, express_validator_1.body)("password").exists().withMessage("password is required").isLength({ min: 3 }).withMessage("length should be atleast 3"),
    validate_1.validate
];
//# sourceMappingURL=auth.validations.js.map