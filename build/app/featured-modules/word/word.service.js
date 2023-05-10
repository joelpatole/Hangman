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
const mongoose_1 = require("mongoose");
const category_service_1 = __importDefault(require("../category/category.service"));
const word_repo_1 = __importDefault(require("./word.repo"));
const word_responses_1 = require("./word.responses");
const enumUtil_1 = require("../../utility/enumUtil");
const pipeline_1 = require("../../utility/pipeline");
const tournament_service_1 = __importDefault(require("../tournaments/tournament.service"));
const find = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = yield (0, pipeline_1.generatePipeline)(query);
    if (pipeline.length === 0)
        pipeline.push({ $match: {} });
    return word_repo_1.default.aggregation(pipeline);
});
const addNewWord = (wordDoc) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof wordDoc.difficulty == 'string') {
            const difficultyLevelInString = String(wordDoc.difficulty);
            wordDoc.difficulty = enumUtil_1.difficultyLevelHelper.convertStringToValue(difficultyLevelInString);
        }
        const existingWord = yield word_repo_1.default.findOne(wordDoc.word);
        if (existingWord) {
            let errString = "";
            for (let j = 0; j < wordDoc.category.length; j++) {
                if (existingWord.category.toString().includes(wordDoc.category[j].toString())) {
                    errString = errString + " " + `unselect ${wordDoc.category[j]} because it is already present`;
                }
                else {
                    const objId = yield category_service_1.default.findOne({ _id: wordDoc.category[j] });
                    yield word_repo_1.default.updateOne({ _id: existingWord._id }, { $push: { category: objId === null || objId === void 0 ? void 0 : objId._id } });
                }
            }
        }
        else {
            yield word_repo_1.default.addNewWord(wordDoc);
        }
        const result = yield word_repo_1.default.findOne(wordDoc.word);
        if (!result)
            throw word_responses_1.WORD_RESPONSES.COULD_NOT_ADD_WORD;
        return result;
    }
    catch (err) {
        throw err;
    }
});
const getGameWords = (tournament_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const tournament = yield tournament_service_1.default.findOne(new mongoose_1.Types.ObjectId(tournament_id));
    if (tournament) {
        const sampleWords = [];
        const chunksArray = [];
        const categories = tournament.category;
        console.log(categories);
        console.log(tournament.tounament_words);
        if (tournament.tounament_words) {
            const numberOfWordsToFind = 10 - ((_a = tournament.tounament_words) === null || _a === void 0 ? void 0 : _a.length);
            for (let i = 1; i <= categories.length; i++) {
                if (i !== categories.length && categories.length !== 1) {
                    chunksArray.push(Math.floor(numberOfWordsToFind / categories.length));
                }
                else {
                    chunksArray.push(Math.ceil(numberOfWordsToFind / categories.length));
                }
            }
        }
        for (let chunk = 0; chunk < chunksArray.length; chunk++) {
            const pipline = [
                { $match: { category: { $elemMatch: { $eq: categories[chunk] } }, difficulty: tournament.difficulty } },
                { $sample: { size: chunksArray[chunk] } }
            ];
            const result = yield word_repo_1.default.aggregation(pipline);
            sampleWords.push(...result);
        }
        if (tournament.tounament_words) {
            tournament.tounament_words.forEach(word => {
                sampleWords.push(word);
            });
        }
        return [...sampleWords];
    }
});
exports.default = {
    addNewWord,
    find,
    getGameWords
};
//# sourceMappingURL=word.service.js.map