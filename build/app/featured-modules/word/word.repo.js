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
const word_schema_1 = require("./word.schema");
const aggregation = (pipeline) => __awaiter(void 0, void 0, void 0, function* () { return word_schema_1.wordModel.aggregate(pipeline); });
const updateOne = (filter, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield word_schema_1.wordModel.updateOne(filter, data);
    return result;
});
const findOne = (word) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield word_schema_1.wordModel.findOne({ word: word });
    return result;
});
const addNewWord = (wordDoc) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield word_schema_1.wordModel.create(wordDoc);
    return result;
});
exports.default = {
    addNewWord,
    findOne,
    updateOne,
    aggregation,
};
//# sourceMappingURL=word.repo.js.map