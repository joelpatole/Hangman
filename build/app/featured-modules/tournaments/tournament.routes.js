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
const authorize_1 = require("../../utility/authorize");
const constants_1 = require("../../utility/constants");
const tournament_service_1 = __importDefault(require("./tournament.service"));
const tournament_responses_1 = require("./tournament.responses");
const response_handler_1 = require("../../utility/response.handler");
const tournament_validations_1 = require("./tournament.validations");
const participants_service_1 = __importDefault(require("../participants/participants.service"));
const mongoose_1 = require("mongoose");
const router = (0, express_1.Router)();
router.post("/create-tournament", (0, authorize_1.permit)([constants_1.roles.USER]), tournament_validations_1.CREATE_TOURNAMENT_VALIDATION, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield tournament_service_1.default.createATournament(req.body);
        if (!result)
            throw tournament_responses_1.TOURNAMENT_RESPONSES.COULD_NOT_CREATE_TOURNAMENT;
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.patch("/send-improvement-message", (0, authorize_1.permit)([constants_1.roles.USER, constants_1.roles.ADMIN]), tournament_validations_1.SEND_IMPROVEMENTS_VALIDATION, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("current user_id is :", res.locals.user.id);
        const currentUser = res.locals.user;
        const tounament_id = req.body.tournament_id;
        const improvementMessage = req.body.message;
        const result = yield tournament_service_1.default.updateImprovements(currentUser, tounament_id, improvementMessage);
        if (!result)
            throw tournament_responses_1.TOURNAMENT_RESPONSES.COULD_NOT_ADD_IMPROVEMENTS;
        res.send(result);
    }
    catch (err) {
        next(err);
    }
}));
router.post('/join-a-tournament', (0, authorize_1.permit)([constants_1.roles.USER]), tournament_validations_1.JOIN_A_TOURNAMENT_VALIDATION, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tournament_id } = req.body;
        const { player_id } = req.body;
        const result = yield tournament_service_1.default.addParticipant(tournament_id, player_id);
        if (!result)
            throw tournament_responses_1.TOURNAMENT_RESPONSES.COULD_NOT_ADD_PARTICIPANT;
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.get("/get-all-tournaments", (0, authorize_1.permit)([constants_1.roles.ADMIN]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryType = req.query;
        const result = yield tournament_service_1.default.getAllTournaments(queryType);
        if (!result)
            throw tournament_responses_1.TOURNAMENT_RESPONSES.SOMETHING_WENT_WRONG;
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.get("/get-a-tournament/:id", (0, authorize_1.permit)([constants_1.roles.ADMIN, constants_1.roles.USER]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page } = req.query;
        const id = req.params.id;
        console.log("id is ", id);
        const result = yield tournament_service_1.default.getATournament(id);
        if (!result)
            throw tournament_responses_1.TOURNAMENT_RESPONSES.SOMETHING_WENT_WRONG;
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
    }
}));
router.patch("/update-tournament-status", (0, authorize_1.permit)([constants_1.roles.ADMIN]), tournament_validations_1.UPDATE_STATUS_VALIDATION, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tournament_id } = req.query;
        const { status } = req.query;
        console.log(tournament_id, status);
        console.log(typeof status);
        console.log(typeof tournament_id);
        if (typeof tournament_id == 'string' && typeof status == 'string') {
            const validTournament_id = new mongoose_1.Types.ObjectId(tournament_id);
            const result = yield tournament_service_1.default.updateTournamentStatus(validTournament_id, status);
            if (!result)
                throw tournament_responses_1.TOURNAMENT_RESPONSES.SOMETHING_WENT_WRONG;
            res.send(new response_handler_1.ResponseHandler(result));
        }
        else {
            throw tournament_responses_1.TOURNAMENT_RESPONSES.SOMETHING_WENT_WRONG;
        }
    }
    catch (err) {
        next(err);
    }
}));
router.patch('/delete-tournament-words', (0, authorize_1.permit)([constants_1.roles.USER]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const word = req.query.word;
        const tournament_id = req.query.tournament_id;
        const creator = res.locals.user;
        if (typeof word == 'string' && typeof tournament_id == 'string') {
            const result = yield tournament_service_1.default.deleteTournamentWord(word, new mongoose_1.Types.ObjectId(tournament_id), creator.id);
            if (!result)
                throw "something went wrong";
            res.send(new response_handler_1.ResponseHandler(result));
        }
        else {
            throw "input selection not correct";
        }
    }
    catch (err) {
        next(err);
    }
}));
router.patch("/end-tournament/:id", (0, authorize_1.permit)([constants_1.roles.USER]), tournament_validations_1.END_TOURNAMENT_VALIDATION, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tournament_id = new mongoose_1.Types.ObjectId(req.params.id);
        const currentUserID = new mongoose_1.Types.ObjectId(res.locals.user.id);
        const result = yield tournament_service_1.default.endTournament(tournament_id, currentUserID);
        if (!result)
            throw tournament_responses_1.TOURNAMENT_RESPONSES.SOMETHING_WENT_WRONG;
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
//testing route
router.post("/create-participants", (0, authorize_1.permit)([constants_1.roles.ADMIN, constants_1.roles.USER]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { tournament_id } = req.body;
    const result = participants_service_1.default.createParticipants(tournament_id);
    res.send(result);
}));
exports.default = router;
//# sourceMappingURL=tournament.routes.js.map