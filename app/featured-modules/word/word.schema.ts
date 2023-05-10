import mongoose, { model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { wordType } from "./word.type";



const wordSchema = new BaseSchema({
  word : {
    type : String,
    required : true,
  },
  difficulty : {
    type : Number,
    required : true
  },
  category : {
    type : [mongoose.Schema.Types.ObjectId],
    ref : 'Category'
  }

})


export const wordModel = model<wordType>('Word',wordSchema)