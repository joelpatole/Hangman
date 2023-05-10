"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.END_TOURNAMENT_VALIDATION = exports.UPDATE_STATUS_VALIDATION = exports.JOIN_A_TOURNAMENT_VALIDATION = exports.SEND_IMPROVEMENTS_VALIDATION = exports.CREATE_TOURNAMENT_VALIDATION = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.CREATE_TOURNAMENT_VALIDATION = [
    (0, express_validator_1.body)("name").exists().withMessage("name is required"),
    (0, express_validator_1.body)("creator_id").exists().withMessage("name is required").isMongoId().withMessage("should be a valid mongoID"),
    (0, express_validator_1.body)("category").exists().withMessage("category of words for tournament should exist"),
    (0, express_validator_1.body)("difficulty").exists().withMessage("difficulty should exist"),
    (0, express_validator_1.body)("end_date").exists().withMessage("end date should be mentioned"),
    validate_1.validate
];
exports.SEND_IMPROVEMENTS_VALIDATION = [
    (0, express_validator_1.body)("tournament_id").exists().withMessage("tournament_id is required").isMongoId().withMessage("should be a valid mongoID"),
    (0, express_validator_1.body)("message").exists().withMessage("improvement message is required"),
    validate_1.validate
];
exports.JOIN_A_TOURNAMENT_VALIDATION = [
    (0, express_validator_1.body)("tournament_id").exists().withMessage("tournament_id is required").isMongoId().withMessage("should be a valid mongoID"),
    (0, express_validator_1.body)("player_id").exists().withMessage("player_id should exist").isMongoId().withMessage("player id should be valid"),
    validate_1.validate
];
exports.UPDATE_STATUS_VALIDATION = [
    (0, express_validator_1.query)("tournament_id").exists().withMessage("tournament id should exist").isMongoId().withMessage("not a vlaid id"),
    (0, express_validator_1.query)('status').exists().withMessage("status should be present"),
    validate_1.validate
];
exports.END_TOURNAMENT_VALIDATION = [
    (0, express_validator_1.param)("id").exists().withMessage("tournament_id is required").isMongoId().withMessage("should be a valid mongoID"),
    validate_1.validate
];
//# sourceMappingURL=tournament.validations.js.map