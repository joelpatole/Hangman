"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATE_NEW_CATEGORY_VALIDATOR = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.CREATE_NEW_CATEGORY_VALIDATOR = [
    (0, express_validator_1.body)("categoryName").exists().withMessage("category name is required"),
    validate_1.validate
];
//# sourceMappingURL=category.validations.js.map