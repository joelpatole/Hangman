import mongoose, { model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { notificationType } from "./notification.types";



const notificationSchema = new BaseSchema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    username : {
        type : String
    },
    message : {
        type : String
    }
})

export const notificationModel = model<notificationType>('Notification',notificationSchema)