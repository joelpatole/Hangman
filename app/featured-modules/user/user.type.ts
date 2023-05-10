import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
    _id?: Schema.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    username : string;
    role?: number
}

export type UserType = Document & IUser;