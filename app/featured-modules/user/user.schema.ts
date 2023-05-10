import mongoose, { model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { UserType } from "./user.type";
import { roles } from "../../utility/constants";


const userSchema = new BaseSchema({
    name :{
        type :  String
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
    username:{
        type : String,
        required : true,
        unique:true
    },
    role:{
        type: Number,
        ref: "Role",
        default : roles.USER
    }
})

export const userModel = model<UserType>("User", userSchema);
