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
const constants_1 = require("../../utility/constants");
const authorize_1 = require("../../utility/authorize");
const category_validations_1 = require("./category.validations");
const category_service_1 = __importDefault(require("./category.service"));
const category_responses_1 = require("./category.responses");
const response_handler_1 = require("../../utility/response.handler");
const router = (0, express_1.Router)();
router.post('/create-new-caregory', (0, authorize_1.permit)([constants_1.roles.ADMIN]), category_validations_1.CREATE_NEW_CATEGORY_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryName } = req.body;
        const result = yield category_service_1.default.createCategory(categoryName);
        if (!result)
            throw category_responses_1.CATEGORY_RESPONSES.COULD_NOT_CREATE;
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
//# sourceMappingURL=category.routes.js.map