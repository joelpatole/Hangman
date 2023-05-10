import mongoose, { Schema } from "mongoose"


export interface IWord{
   _id? : Schema.Types.ObjectId;
   word : string;
   difficulty : number;
   category : mongoose.Schema.Types.ObjectId[];
} 

export type wordType = IWord & Document