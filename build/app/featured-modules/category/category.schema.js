"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryModel = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utility/base.schema");
const categorySchema = new base_schema_1.BaseSchema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    }
});
exports.categoryModel = (0, mongoose_1.model)("Category", categorySchema);
//# sourceMappingURL=category.schema.js.map