"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleModel = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utility/base.schema");
const roleSchema = new base_schema_1.BaseSchema({
    _id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    }
});
exports.roleModel = (0, mongoose_1.model)("Role", roleSchema);
//# sourceMappingURL=role.schema.js.map