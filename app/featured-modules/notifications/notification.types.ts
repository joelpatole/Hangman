import mongoose, { Schema } from "mongoose";


export interface INotification{
    _id? : Schema.Types.ObjectId;
    user_id : mongoose.Schema.Types.ObjectId;
    username : string;
    message : string
}

export type notificationType = INotification & Document