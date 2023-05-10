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
const participants_schema_1 = require("./participants.schema");
const aggregation = (pipeline) => __awaiter(void 0, void 0, void 0, function* () { return participants_schema_1.ParticipantModel.aggregate(pipeline); });
const findOne = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield participants_schema_1.ParticipantModel.findOne(filter).populate('participants.player_id', 'username').sort({ 'participants.score': -1 });
    return result;
});
const updateParticipants = (filter, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield participants_schema_1.ParticipantModel.updateOne(filter, data);
    return result;
});
const create = (participantsList) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield participants_schema_1.ParticipantModel.create(participantsList);
    return result;
});
exports.default = {
    create,
    updateParticipants,
    findOne,
    aggregation
};
//# sourceMappingURL=participants.repo.js.map