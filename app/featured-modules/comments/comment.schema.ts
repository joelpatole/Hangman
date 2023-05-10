import mongoose, { model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { CommentType } from "./comments.type";


const commentSchema = new BaseSchema({
  tournament_id : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Tournament",
    required : true
  },
  comments : {
    type : [
       {
         username : {
            type : String,
            required : true
         },
         comment : {
            type : String,
            required : true
         },
         isDeleted : {
            type : Boolean,
            default : false,
         }
       }
    ]
  }
})

export const CommentModel = model<CommentType>("Comment",commentSchema)