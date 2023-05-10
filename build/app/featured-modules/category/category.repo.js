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
const category_schema_1 = require("./category.schema");
const findOne = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_schema_1.categoryModel.findOne(Object.assign({}, filter));
    return result;
});
const createCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    if (category.categoryName) {
        category.categoryName = category.categoryName.toLowerCase();
        const result = yield category_schema_1.categoryModel.create(category);
        return result;
    }
});
exports.default = {
    findOne,
    createCategory
};
//# sourceMappingURL=category.repo.js.map