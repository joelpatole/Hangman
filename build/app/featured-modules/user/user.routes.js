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
const user_service_1 = __importDefault(require("./user.service"));
const user_response_1 = require("./user.response");
const response_handler_1 = require("../../utility/response.handler");
const router = (0, express_1.Router)();
router.get("/userDashboard", (0, authorize_1.permit)([constants_1.roles.USER]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryType = req.query;
        const result = yield user_service_1.default.getAllTournaments(queryType);
        if (!result)
            throw user_response_1.USER_RESPONSES.COULD_NOT_FETCH;
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
//# sourceMappingURL=user.routes.js.map