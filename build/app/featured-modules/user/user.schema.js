"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utility/base.schema");
const constants_1 = require("../../utility/constants");
const userSchema = new base_schema_1.BaseSchema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: Number,
        ref: "Role",
        default: constants_1.roles.USER
    }
});
exports.userModel = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=user.schema.js.map