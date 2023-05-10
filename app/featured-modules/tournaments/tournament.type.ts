import mongoose, { Schema } from "mongoose";

export interface ITournament{
    id?: Schema.Types.ObjectId;
    name: string;
    creator_id : Schema.Types.ObjectId;
    category : mongoose.Schema.Types.ObjectId[];
    difficulty : number;
    improvements? : ImprovementType[]; //ref to improvement schema
    comments? :  mongoose.Types.ObjectId; //ref to comment schema
    tounament_words? : TournamentWordType[]
    status? : number
    end_date : Date;
    winner : mongoose.Schema.Types.ObjectId;
}

export interface IImprovements{
    user_id: mongoose.Schema.Types.ObjectId;
    username : string;
    improvement : string;
}

export interface IComments{
    user_id: mongoose.Schema.Types.ObjectId;
    username : string;
    comment : string; 
}

export interface ITournamentWord{
 _id? : mongoose.Schema.Types.ObjectId, 
  word : string,
  category : mongoose.Schema.Types.ObjectId[]
}


export type ImprovementType = IImprovements
export type CommentType = IComments;
export type TournamentWordType = ITournamentWord

export type TournamentType = Document & ITournament