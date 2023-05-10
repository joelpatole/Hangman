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
const role_schema_1 = require("./role.schema");
const add = (role) => role_schema_1.roleModel.create(role);
const findOne = (filter) => role_schema_1.roleModel.findOne(filter);
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield role_schema_1.roleModel.updateOne({ _id: id }, { isDeleted: true });
});
exports.default = {
    add,
    findOne,
    remove
};
//# sourceMappingURL=role.repo.js.map