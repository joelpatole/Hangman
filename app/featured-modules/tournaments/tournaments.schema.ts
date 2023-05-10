import mongoose, { Schema, model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { difficultyLevel, status } from "../../utility/constants";
import { TournamentType } from "./tournament.type";



const tournamentSchema = new BaseSchema({
   name : {
    type : String,
    required : true
  },
  creator_id : {
    type : Schema.Types.ObjectId,
    required : true
  },
  category : {
    type : [mongoose.Schema.Types.ObjectId],
    required : true,
    ref : "Category"
  },
  difficulty : {
    type : Number,
    required : true
  },
  improvements :{ 
    type : [String],
  },
  comments : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Comments",
  },
  status : {
    type : Number,
    required : true,
    default : status.pending
  },
  tounament_words : {
    type : [{
      word : String,
      category : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "Category"
      }
    }]
  },
  end_date : {
    type : Date,
    required: true
  },
  winner : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    default : null
  }

})

export const TournamentModel = model<TournamentType>('Tournament',tournamentSchema)