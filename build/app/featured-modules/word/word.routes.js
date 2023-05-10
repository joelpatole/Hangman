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
const word_service_1 = __importDefault(require("./word.service"));
const word_responses_1 = require("./word.responses");
const response_handler_1 = require("../../utility/response.handler");
const word_validations_1 = require("./word.validations");
const router = (0, express_1.Router)();
router.post('/add-new-word', (0, authorize_1.permit)([constants_1.roles.ADMIN]), word_validations_1.ADD_NEW_WORD_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wordDoc = req.body;
        const result = yield word_service_1.default.addNewWord(wordDoc);
        if (!result)
            throw word_responses_1.WORD_RESPONSES.COULD_NOT_ADD_WORD;
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.get("/get-words", (0, authorize_1.permit)([constants_1.roles.ADMIN]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const queryType = req.query;
    const result = yield word_service_1.default.find(req.query);
    if (!result)
        throw word_responses_1.WORD_RESPONSES.COULD_NOT_FETCH_WORDS;
    res.send(new response_handler_1.ResponseHandler(result));
}));
router.get("/get-game-words", (0, authorize_1.permit)([constants_1.roles.USER]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("OK");
        const tournament_id = String(req.query.tournament_id);
        const result = yield word_service_1.default.getGameWords(tournament_id);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
//# sourceMappingURL=word.routes.js.map