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
const role_repo_1 = __importDefault(require("./role.repo"));
const role_response_1 = require("./role.response");
const add = (role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oldRole = yield role_repo_1.default.findOne({ _id: role._id });
        if (oldRole)
            throw role_response_1.RoleResponses.ROLE_ALREADY_EXIST;
        return role_repo_1.default.add(role);
    }
    catch (err) {
        throw err;
    }
});
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield role_repo_1.default.findOne({ _id: Number(id) });
        if (!role)
            throw role_response_1.RoleResponses.ROLE_NOT_FOUND;
        return role_repo_1.default.remove(Number(id));
    }
    catch (err) {
        throw err;
    }
});
const findOne = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (_id == undefined) {
            throw role_response_1.RoleResponses.ROLE_NOT_FOUND;
        }
        else {
            const role = yield role_repo_1.default.findOne({ _id });
            if (!role)
                throw role_response_1.RoleResponses.ROLE_NOT_FOUND;
            return role;
        }
    }
    catch (err) {
        throw err;
    }
});
exports.default = {
    add,
    remove,
    findOne
};
//# sourceMappingURL=role.services.js.map