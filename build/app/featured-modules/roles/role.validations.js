"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATE_ROLE_VALIDATION = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.CREATE_ROLE_VALIDATION = [
    (0, express_validator_1.body)("id").exists().withMessage("id is required"),
    (0, express_validator_1.body)("name").exists().withMessage("name is required"),
    validate_1.validate
];
//# sourceMappingURL=role.validations.js.map