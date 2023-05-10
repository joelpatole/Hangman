import mongoose from "mongoose";


export interface IComment {
    _id? : mongoose.Schema.Types.ObjectId,
    tournament_id : mongoose.Schema.Types.ObjectId,
    comments : CommentMessageType[]
}

export interface ICommentMessage {
    username : string,
    comment : string,
    isDeleted : boolean
}

export type CommentMessageType = ICommentMessage
export type CommentType = IComment & Document
