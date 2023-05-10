import mongoose, { Schema } from "mongoose";



export interface IParticipantsList{
    _id? : Schema.Types.ObjectId;
    tournament_id : mongoose.Schema.Types.ObjectId;
    participants? : playerType[];
}

export interface IPlayer{
    player_id : mongoose.Schema.Types.ObjectId;
    score? : number;
    totalTimeTaken? : number;
}

export type  playerType = IPlayer & Document
export type participantsListType = IParticipantsList & Document