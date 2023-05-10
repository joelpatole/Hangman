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
const tournaments_schema_1 = require("./tournaments.schema");
const findOne = (tournament_id) => __awaiter(void 0, void 0, void 0, function* () {
    const tournament = yield tournaments_schema_1.TournamentModel.findOne({ _id: tournament_id });
    return tournament;
});
const aggregation = (pipeline) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tournaments_schema_1.TournamentModel.aggregate(pipeline);
});
const getATournament = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("filter in get A tournament", filter);
    const result = yield tournaments_schema_1.TournamentModel.findOne(Object.assign({}, filter)).populate("tounament_words.category", "categoryName").populate("category", "categoryName");
    return result;
});
const createATournament = (tournament) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tournaments_schema_1.TournamentModel.create(tournament);
    return result;
});
const update = (filter, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tournaments_schema_1.TournamentModel.updateOne(filter, data);
    return result;
});
// const deleteWords = async(filter:FilterQuery<ITournament>, data : UpdateQuery<ITournament>)=>{
//   const result = await T
// }
exports.default = {
    getATournament,
    createATournament,
    update,
    aggregation,
    findOne
};
//# sourceMappingURL=tournament.repo.js.map