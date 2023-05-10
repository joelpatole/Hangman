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
const participants_repo_1 = __importDefault(require("./participants.repo"));
const createParticipants = (tournament_id) => __awaiter(void 0, void 0, void 0, function* () {
    const participantsList = {
        tournament_id: Object(tournament_id)
    };
    return yield participants_repo_1.default.create(participantsList);
});
const addParticipant = (tournament_id, player) => __awaiter(void 0, void 0, void 0, function* () {
    yield participants_repo_1.default.updateParticipants({ tournament_id: tournament_id }, { $push: { participants: player } });
    const result = yield participants_repo_1.default.findOne({ tournament_id: tournament_id });
    return result;
});
const getLeaderboard = (tournament_id) => __awaiter(void 0, void 0, void 0, function* () {
    //    const remaining = {
    //      $match: { tournament_id: new Types.ObjectId(tournament_id) },
    //      $unwind: '$participants' ,
    //      $sort: { 'participants.score': -1 } 
    //    }
    //     const query = { page: 1,limit: 1 ,...remaining};
    //     console.log(query)
    //     const pipeline = generatePipeline(query);
    //     console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
    //     console.log(pipeline)
    const pipelineQuery = [
        { $match: { tournament_id: new mongoose_1.Types.ObjectId(tournament_id) } },
        { $unwind: '$participants' },
        { $sort: { 'participants.score': -1, 'participants.totalTimeTaken': 1 } },
        { $project: { 'participants.player_id': 1, 'participants.score': 1, 'participants.totalTimeTaken': 1, '_id': 0 } }
    ];
    const leaderBoard = yield participants_repo_1.default.aggregation(pipelineQuery);
    return leaderBoard;
});
const insertTournamentScore = (query, player_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let result = null;
    const tournamentParticipants = yield participants_repo_1.default.findOne({ tournament_id: query.tournament_id });
    if (((_a = tournamentParticipants === null || tournamentParticipants === void 0 ? void 0 : tournamentParticipants.participants) === null || _a === void 0 ? void 0 : _a.length) !== undefined) {
        for (let singlePlayer of tournamentParticipants === null || tournamentParticipants === void 0 ? void 0 : tournamentParticipants.participants) {
            const playerInString = JSON.stringify(singlePlayer.player_id);
            const playerInJson = JSON.parse(playerInString);
            if (playerInJson._id.toString() == player_id.toString()) {
                singlePlayer.score = query.score;
                singlePlayer.totalTimeTaken = query.timeTaken;
                result = yield participants_repo_1.default.updateParticipants({ tournament_id: query.tournament_id, "participants.player_id": player_id }, { $set: { "participants.$.score": singlePlayer.score, "participants.$.totalTimeTaken": singlePlayer.totalTimeTaken } });
            }
        }
        return result;
    }
});
exports.default = {
    createParticipants,
    addParticipant,
    getLeaderboard,
    insertTournamentScore
};
//# sourceMappingURL=participants.service.js.map