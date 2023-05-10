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
const comment_repo_1 = __importDefault(require("./comment.repo"));
const user_service_1 = __importDefault(require("../user/user.service"));
const comment_responses_1 = require("./comment.responses");
const notification_services_1 = __importDefault(require("../notifications/notification.services"));
const tournament_service_1 = __importDefault(require("../tournaments/tournament.service"));
const create = (tournament_id) => __awaiter(void 0, void 0, void 0, function* () {
    const commentObject = {
        tournament_id: Object(tournament_id),
        comments: []
    };
    const result = yield comment_repo_1.default.create(commentObject);
    return result;
});
const insertComment = (tournament_id, comment, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.default.findOne({ _id: user_id });
    if (user) {
        const commetObject = {
            username: user.username,
            comment: comment,
            isDeleted: false
        };
        const result = yield comment_repo_1.default.update({ tournament_id: tournament_id }, { $push: { comments: commetObject } });
        return result;
    }
    else {
        throw comment_responses_1.COMMENT_RESPONSES.USER_NOT_FOUND;
    }
});
const getAllComments = (tournament_id) => __awaiter(void 0, void 0, void 0, function* () {
    const finalResult = [];
    const result = yield comment_repo_1.default.getAllComments(tournament_id);
    if (result) {
        result.comments.forEach((comment) => {
            const commentObject = {
                username: comment.username,
                comment: comment.comment,
            };
            finalResult.push(commentObject);
        });
    }
    return finalResult;
});
const deleteComment = (tournament_id, comment_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_repo_1.default.deleteComment(tournament_id, comment_id);
    const tournament = yield tournament_service_1.default.findOne(tournament_id);
    let user;
    let comment = "";
    if (result) {
        for (let commentObject of result === null || result === void 0 ? void 0 : result.comments) {
            const stringifiedObject = JSON.stringify(commentObject);
            const parsedObject = JSON.parse(stringifiedObject);
            if (parsedObject._id == comment_id) {
                comment = parsedObject.comment;
                user = yield user_service_1.default.findOne({ username: commentObject.username });
            }
        }
    }
    if (user) {
        yield notification_services_1.default.create(user, `Your Comment ${comment} in ${tournament === null || tournament === void 0 ? void 0 : tournament.name} was deleted`);
    }
    return result;
});
exports.default = {
    insertComment,
    create,
    getAllComments,
    deleteComment
};
//# sourceMappingURL=comment.services.js.map