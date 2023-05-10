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
const express_1 = require("express");
const constants_1 = require("../../utility/constants");
const authorize_1 = require("../../utility/authorize");
const participants_service_1 = __importDefault(require("./participants.service"));
const participants_responses_1 = require("./participants.responses");
const router = (0, express_1.Router)();
//validations
router.patch("/insert-score", (0, authorize_1.permit)([constants_1.roles.USER]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            timeTaken: req.query.timeTaken,
            score: req.query.score,
            tournament_id: req.query.tournament_id
        };
        const player_id = res.locals.user.id;
        const result = yield participants_service_1.default.insertTournamentScore(query, player_id);
        if (!result)
            throw participants_responses_1.PARTICIPANT_RESPONSES.COULD_NOT_FETCH_PATRICIPANT;
        res.send(result);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
//# sourceMappingURL=participants.routes.js.map