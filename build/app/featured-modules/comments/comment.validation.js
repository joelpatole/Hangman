"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_COMMENTS_VALIDATION = exports.INSERT_COMMENT_VALIDATION = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.INSERT_COMMENT_VALIDATION = [
    (0, express_validator_1.query)("tournament_id").exists().withMessage("tournament_id is required").isMongoId().withMessage("should be a valid mongoID"),
    (0, express_validator_1.query)("comment").exists().withMessage("comment should exist"),
    validate_1.validate
];
exports.GET_COMMENTS_VALIDATION = [
    (0, express_validator_1.param)("tournament_id").exists().withMessage("tournament_id is required").isMongoId().withMessage("should be a valid mongoID"),
    validate_1.validate
];
//# sourceMappingURL=comment.validation.js.map