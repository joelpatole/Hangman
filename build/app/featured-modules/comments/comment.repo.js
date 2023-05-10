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
Object.defineProperty(exports, "__esModule", { value: true });
const comment_schema_1 = require("./comment.schema");
const aggregation = (pipeline) => __awaiter(void 0, void 0, void 0, function* () {
    return yield comment_schema_1.CommentModel.aggregate(pipeline);
});
const create = (commentObject) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_schema_1.CommentModel.create(commentObject);
    return result;
});
const getAllComments = (tournament_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_schema_1.CommentModel.findOne({ tournament_id: tournament_id }).elemMatch('comments', { isDeleted: false });
    return result;
});
const update = (filter, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = comment_schema_1.CommentModel.updateOne(filter, data);
    return result;
});
const deleteComment = (tournament_id, comment_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_schema_1.CommentModel.findOneAndUpdate({
        tournament_id: tournament_id,
        'comments._id': comment_id
    }, {
        $set: { 'comments.$.isDeleted': true }
    }, {
        new: true,
    });
    return result;
});
exports.default = {
    getAllComments,
    update,
    create,
    aggregation,
    deleteComment
};
//# sourceMappingURL=comment.repo.js.map