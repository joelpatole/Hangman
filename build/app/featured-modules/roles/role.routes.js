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
const role_services_1 = __importDefault(require("./role.services"));
const response_handler_1 = require("../../utility/response.handler");
const authorize_1 = require("../../utility/authorize");
const constants_1 = require("../../utility/constants");
const role_validations_1 = require("./role.validations");
const router = (0, express_1.Router)();
router.post("/add-new-role", (0, authorize_1.permit)([constants_1.roles.ADMIN]), role_validations_1.CREATE_ROLE_VALIDATION, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name } = req.body;
        const result = yield role_services_1.default.add({ _id: id, name: name });
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.delete("/delete-a-role/:id", (0, authorize_1.permit)([constants_1.roles.ADMIN]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield role_services_1.default.remove(id);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        console.log("error");
        next(err);
    }
}));
exports.default = router;
//# sourceMappingURL=role.routes.js.map