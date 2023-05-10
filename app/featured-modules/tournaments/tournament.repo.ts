import { FilterQuery, PipelineStage, Schema, Types, UpdateQuery } from "mongoose";
import { ITournament } from "./tournament.type";
import { TournamentModel } from "./tournaments.schema";

const findOne = async(tournament_id : Types.ObjectId)=>{
  const tournament = await TournamentModel.findOne({_id : tournament_id});
  return tournament;
}

const aggregation = async (pipeline: PipelineStage[]) => {
    return await TournamentModel.aggregate(pipeline);
}

const getATournament = async(filter : FilterQuery<ITournament>)=>{
    console.log("filter in get A tournament", filter);
   const result = await TournamentModel.findOne({...filter}).populate("tounament_words.category", "categoryName").populate("category", "categoryName");
   return result;
}

const createATournament = async(tournament : ITournament)=>{
    const result = await TournamentModel.create(tournament)
    return result;
}


const update = async(filter : FilterQuery<ITournament>,data : UpdateQuery<ITournament>)=>{
    const result = await TournamentModel.updateOne(filter,data);
    return result;
}

// const deleteWords = async(filter:FilterQuery<ITournament>, data : UpdateQuery<ITournament>)=>{
//   const result = await T
// }

export default{
    getATournament,
    createATournament,
    update,
    aggregation,
    findOne
}