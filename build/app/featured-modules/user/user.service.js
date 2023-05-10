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
const user_repo_1 = __importDefault(require("./user.repo"));
const user_response_1 = require("./user.response");
const constants_1 = require("../../utility/constants");
const tournament_service_1 = __importDefault(require("../tournaments/tournament.service"));
const notification_services_1 = __importDefault(require("../notifications/notification.services"));
const find = (filter) => user_repo_1.default.find(Object.assign({ role: constants_1.roles.USER }, filter));
const findOne = (filter) => user_repo_1.default.findOne(filter);
const create = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield user_repo_1.default.findOne({ email: user.email });
        if (existingUser)
            throw user_response_1.USER_RESPONSES.USER_ALREADY_EXIST;
        const existingUserName = yield user_repo_1.default.findOne({ username: user.username });
        if (existingUserName)
            throw user_response_1.USER_RESPONSES.USERNAME_ALREADY_EXIST;
        const result = yield user_repo_1.default.create(user);
        const notificationresult = yield notification_services_1.default.create(result, "Account Created");
        console.log("notificationresult : ", notificationresult);
        return result;
    }
    catch (err) {
        throw err;
    }
});
const getAllTournaments = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryType = Object.assign(Object.assign({}, query), { status: 2 });
    const result = yield tournament_service_1.default.getAllTournaments(queryType);
    return result;
});
exports.default = {
    create,
    find,
    findOne,
    getAllTournaments
};
//# sourceMappingURL=user.service.js.map