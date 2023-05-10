import { model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { RoleType } from "./role.types";

const roleSchema = new BaseSchema({

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

export const roleModel = model<RoleType>("Role", roleSchema);