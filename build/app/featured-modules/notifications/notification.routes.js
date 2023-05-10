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
const express_1 = require("express");
const authorize_1 = require("../../utility/authorize");
const constants_1 = require("../../utility/constants");
const notification_services_1 = __importDefault(require("./notification.services"));
const response_handler_1 = require("../../utility/response.handler");
const notification_responses_1 = require("./notification.responses");
const router = (0, express_1.Router)();
router.get("/get-my-notifications", (0, authorize_1.permit)([constants_1.roles.ADMIN, constants_1.roles.USER]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryType = req.query;
        const result = yield notification_services_1.default.getNotifications(queryType);
        if (!result)
            throw notification_responses_1.NOTIFICATION_RESPONSES.COULD_NOT_FETCH_NOTIFICATION;
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
//# sourceMappingURL=notification.routes.js.map