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
const comment_validation_1 = require("./comment.validation");
const comment_services_1 = __importDefault(require("./comment.services"));
const mongoose_1 = require("mongoose");
const comment_responses_1 = require("./comment.responses");
const response_handler_1 = require("../../utility/response.handler");
const router = (0, express_1.Router)();
router.patch('/insert-comment', (0, authorize_1.permit)([constants_1.roles.USER]), comment_validation_1.INSERT_COMMENT_VALIDATION, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tournament_id = req.query.tournament_id;
        const comment = req.query.comment;
        const user_id = res.locals.user.id;
        console.log(user_id);
        if (typeof comment == 'string') {
            const result = yield comment_services_1.default.insertComment(Object(tournament_id), comment, user_id);
            if (!result)
                throw comment_responses_1.COMMENT_RESPONSES.SOMETHING_WENT_WRONG;
            res.send(new response_handler_1.ResponseHandler(result));
        }
    }
    catch (err) {
        next(err);
    }
}));
router.get("/see-comments/:id", (0, authorize_1.permit)([constants_1.roles.ADMIN, constants_1.roles.MODERATOR, constants_1.roles.USER]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tournament_id = new mongoose_1.Types.ObjectId(req.params.id);
        const result = yield comment_services_1.default.getAllComments(tournament_id);
        if (!result)
            throw comment_responses_1.COMMENT_RESPONSES.SOMETHING_WENT_WRONG;
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.patch("/delete-comment", (0, authorize_1.permit)([constants_1.roles.MODERATOR]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof req.query.tournament_id == 'string' && typeof req.query.comment_id == 'string') {
            const result = yield comment_services_1.default.deleteComment(new mongoose_1.Types.ObjectId(req.query.tournament_id), new mongoose_1.Types.ObjectId(req.query.comment_id));
            if (!result)
                throw comment_responses_1.COMMENT_RESPONSES.SOMETHING_WENT_WRONG;
            res.send(new response_handler_1.ResponseHandler(result));
        }
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
//# sourceMappingURL=comment.routes.js.map