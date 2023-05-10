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
const category_repo_1 = __importDefault(require("./category.repo"));
const category_responses_1 = require("./category.responses");
const findOne = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_repo_1.default.findOne(Object.assign({}, filter));
    return result;
});
const createCategory = (categoryName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCategory = {
            categoryName: categoryName.toLowerCase()
        };
        const existingCategory = yield category_repo_1.default.findOne({ categoryName: categoryName.toLowerCase() });
        if (existingCategory)
            throw category_responses_1.CATEGORY_RESPONSES.CATEGORY_EXISTS;
        const result = yield category_repo_1.default.createCategory(newCategory);
        return result;
    }
    catch (err) {
        throw (err);
    }
});
exports.default = {
    createCategory,
    findOne
};
//# sourceMappingURL=category.service.js.map