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
const pipeline_1 = require("../../utility/pipeline");
const notification_repo_1 = __importDefault(require("./notification.repo"));
const create = (user, message) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user in noti service", user);
    if (user._id) {
        const notificationObject = {
            user_id: user._id,
            username: user.username,
            message: message
        };
        const result = yield notification_repo_1.default.create(notificationObject);
        return result;
    }
});
const getNotifications = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = yield (0, pipeline_1.generatePipeline)(query);
    pipeline.push({ $sort: { 'createdAt': -1 } });
    if (pipeline.length === 0)
        pipeline.push({ $match: {} });
    const result = yield notification_repo_1.default.aggregation(pipeline);
    const notificationArray = [];
    for (let eachNotification of result) {
        notificationArray.push({ message: eachNotification.message });
    }
    return notificationArray;
});
exports.default = {
    create,
    getNotifications
};
//# sourceMappingURL=notification.services.js.map