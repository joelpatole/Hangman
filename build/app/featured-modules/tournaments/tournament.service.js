"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importStar(require("mongoose"));
const enumUtil_1 = require("../../utility/enumUtil");
const tournament_repo_1 = __importDefault(require("./tournament.repo"));
const user_service_1 = __importDefault(require("../user/user.service"));
const constants_1 = require("../../utility/constants");
const participants_service_1 = __importDefault(require("../participants/participants.service"));
const tournament_responses_1 = require("./tournament.responses");
const pipeline_1 = require("../../utility/pipeline");
const category_service_1 = __importDefault(require("../category/category.service"));
const word_service_1 = __importDefault(require("../word/word.service"));
const notification_services_1 = __importDefault(require("../notifications/notification.services"));
const notification_constants_1 = require("../notifications/notification.constants");
const comment_services_1 = __importDefault(require("../comments/comment.services"));
const findOne = (tournament_id) => __awaiter(void 0, void 0, void 0, function* () {
    const tournament = yield tournament_repo_1.default.findOne(tournament_id);
    return tournament;
});
const createATournament = (tournament) => __awaiter(void 0, void 0, void 0, function* () {
    tournament.difficulty = enumUtil_1.difficultyLevelHelper.convertStringToValue(String(tournament.difficulty));
    const result = yield tournament_repo_1.default.createATournament(tournament);
    const creator = yield user_service_1.default.findOne({ _id: result === null || result === void 0 ? void 0 : result.creator_id });
    console.log("creator : ", creator);
    if (creator && (result === null || result === void 0 ? void 0 : result.status)) {
        const message = (0, notification_constants_1.createTournamentNotification)(tournament.name, result.status);
        yield notification_services_1.default.create(creator, message);
    }
    return result;
});
const updateImprovements = (currentUser, tournament_id, message) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUserID = new mongoose_1.default.Types.ObjectId(currentUser.id);
    const currentUserDetails = yield user_service_1.default.findOne({ _id: currentUserID });
    console.log("currentUserDetails ", currentUserDetails);
    const improvementString = `${currentUserDetails === null || currentUserDetails === void 0 ? void 0 : currentUserDetails.username} : ${message}`;
    yield tournament_repo_1.default.update({ _id: tournament_id }, { $push: { improvements: improvementString } });
    if ((currentUserDetails === null || currentUserDetails === void 0 ? void 0 : currentUserDetails.role) === constants_1.roles.ADMIN)
        yield tournament_repo_1.default.update({ _id: tournament_id }, [
            { $set: { status: constants_1.status.in_review } },
        ]);
    const result = yield tournament_repo_1.default.getATournament({ _id: tournament_id });
    if ((result === null || result === void 0 ? void 0 : result.status) != undefined) {
        const stringStatus = enumUtil_1.statusHelper.convertEnumValueToString(result === null || result === void 0 ? void 0 : result.status);
        const finalResult = {
            tournamentStatus: stringStatus,
            TounamentDetails: result,
        };
        return finalResult;
    }
});
const addParticipant = (tournament_id, player_id) => __awaiter(void 0, void 0, void 0, function* () {
    const tournament = yield tournament_repo_1.default.getATournament({
        _id: tournament_id,
    });
    console.log(tournament);
    if ((tournament === null || tournament === void 0 ? void 0 : tournament.status) === constants_1.status.active) {
        const player = {
            player_id: Object(player_id),
        };
        const result = yield participants_service_1.default.addParticipant(Object(tournament_id), player);
        return result;
    }
    else {
        throw tournament_responses_1.TOURNAMENT_RESPONSES.TOURNAMENT_NOT_ACTIVE;
    }
});
const getAllTournaments = (query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(query);
    const finalResult = [];
    let categoryArray = [];
    const pipeline = yield (0, pipeline_1.generatePipeline)(query);
    if (pipeline.length === 0)
        pipeline.push({ $match: {} });
    const result = yield tournament_repo_1.default.aggregation(pipeline);
    for (let tournament of result) {
        for (let eachCategory of tournament.category) {
            const category = yield category_service_1.default.findOne({ _id: eachCategory });
            categoryArray.push(category === null || category === void 0 ? void 0 : category.categoryName);
        }
        let final = {
            tournament_id: tournament._id,
            tournamentName: tournament.name,
            difficulty: tournament.difficulty,
            category: categoryArray,
        };
        finalResult.push(final);
        categoryArray = [];
    }
    return finalResult;
});
const getATournament = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let difficultyString = "";
    const tounament_id = new mongoose_1.Types.ObjectId(id);
    const tournament = yield tournament_repo_1.default.getATournament({ _id: tounament_id });
    if ((tournament === null || tournament === void 0 ? void 0 : tournament.difficulty) !== undefined) {
        difficultyString = enumUtil_1.difficultyLevelHelper.convertValueToString(tournament === null || tournament === void 0 ? void 0 : tournament.difficulty);
    }
    const leaderBoard = yield participants_service_1.default.getLeaderboard(tounament_id);
    const finalResult = {
        tournamentName: tournament === null || tournament === void 0 ? void 0 : tournament.name,
        categories: tournament === null || tournament === void 0 ? void 0 : tournament.category,
        difficulty: difficultyString,
        participants: (_b = (_a = leaderBoard[0]) === null || _a === void 0 ? void 0 : _a.participants) === null || _b === void 0 ? void 0 : _b.length,
        leaderBoard: leaderBoard,
    };
    return finalResult;
});
const updateTournamentStatus = (tournament_id, inputStatus) => __awaiter(void 0, void 0, void 0, function* () {
    const statusValue = enumUtil_1.statusHelper.convertStringToEnumValue(inputStatus);
    const updateResult = yield tournament_repo_1.default.update({ _id: tournament_id }, [
        { $set: { status: statusValue } },
    ]);
    if (updateResult.modifiedCount == 1 && statusValue == constants_1.status.active) {
        const result = yield participants_service_1.default.createParticipants(String(tournament_id));
        yield comment_services_1.default.create(tournament_id);
        // console.log(result)
        const tournament = yield tournament_repo_1.default.getATournament({
            _id: tournament_id,
        });
        console.log(tournament);
        if ((tournament === null || tournament === void 0 ? void 0 : tournament.tounament_words) !== undefined) {
            console.log("????", tournament.tounament_words);
            const categoryArray = [];
            for (let eachWord of tournament === null || tournament === void 0 ? void 0 : tournament.tounament_words) {
                const word = eachWord.word;
                const category = eachWord.category;
                console.log(eachWord.category);
                const difficulty = tournament.difficulty;
                if (eachWord.category && Array.isArray(category)) {
                    for (let i = 0; i < eachWord.category.length; i++) {
                        categoryArray.push(eachWord.category[i]);
                    }
                }
                const obj = JSON.stringify(categoryArray);
                const obj2 = JSON.parse(obj);
                console.log(obj2);
                const arrayOfMongoIds = [];
                obj2.forEach((element) => {
                    console.log(element._id);
                    arrayOfMongoIds.push(element._id);
                });
                console.log(arrayOfMongoIds);
                const wordDoc = {
                    word: word,
                    difficulty: difficulty,
                    category: arrayOfMongoIds,
                };
                const addWordResult = word_service_1.default.addNewWord(wordDoc);
                console.log(addWordResult);
            }
        }
        const creator = yield user_service_1.default.findOne({ _id: tournament === null || tournament === void 0 ? void 0 : tournament.creator_id });
        console.log("creator : ", creator);
        if (creator && (tournament === null || tournament === void 0 ? void 0 : tournament.status)) {
            const message = (0, notification_constants_1.createTournamentNotification)(tournament.name, tournament.status);
            yield notification_services_1.default.create(creator, message);
        }
        return updateResult;
    }
    else {
        return updateResult;
    }
});
const deleteTournamentWord = (word, tournament_id, creator_id) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    const tournament = yield tournament_repo_1.default.getATournament({
        _id: tournament_id,
    });
    if (tournament && tournament.creator_id.toString() == creator_id.toString()) {
        if (tournament.status == constants_1.status.in_review || tournament.status == constants_1.status.pending) {
            const tournamentWords = tournament.tounament_words;
            if (tournamentWords !== undefined) {
                tournamentWords.forEach((wordObject) => __awaiter(void 0, void 0, void 0, function* () {
                    if (wordObject.word == word) {
                        const index = tournamentWords.indexOf(wordObject);
                        const newtournamentWordsArray = tournamentWords.splice(index, 1);
                        result = yield tournament_repo_1.default.update({ _id: tournament_id }, { $set: { tournamentWords: tournamentWords } });
                        console.log(result);
                    }
                }));
                return result;
            }
        }
        return result;
    }
    else {
        throw "you are not the creator";
    }
});
const endTournament = (tournament_id, currentUserID) => __awaiter(void 0, void 0, void 0, function* () {
    const tournament = yield tournament_repo_1.default.getATournament({ _id: tournament_id });
    if ((tournament === null || tournament === void 0 ? void 0 : tournament.creator_id.toString()) == currentUserID.toString()) {
        let result = yield tournament_repo_1.default.update({ _id: tournament_id }, { $set: { status: constants_1.status.inactive } });
        if (result.modifiedCount > 0) {
            const leaderBoard = yield participants_service_1.default.getLeaderboard(tournament_id);
            console.log(leaderBoard);
            console.log(leaderBoard[0]);
            result = leaderBoard[0];
        }
        const winner = {
            TournamentWinner: result
        };
        return winner;
    }
    else {
        throw tournament_responses_1.TOURNAMENT_RESPONSES.USER_NOT_VALID;
    }
});
exports.default = {
    createATournament,
    findOne,
    updateImprovements,
    addParticipant,
    getAllTournaments,
    getATournament,
    updateTournamentStatus,
    deleteTournamentWord,
    endTournament
};
//# sourceMappingURL=tournament.service.js.map