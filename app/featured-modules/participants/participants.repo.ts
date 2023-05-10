import { FilterQuery, PipelineStage, UpdateQuery } from "mongoose";
import { ParticipantModel } from "./participants.schema"
import { IParticipantsList, IPlayer } from "./participants.type"

const aggregation = async (pipeline: PipelineStage[]) =>
  ParticipantModel.aggregate(pipeline);

const findOne = async(filter : FilterQuery<IParticipantsList>)=>{
    const result = await ParticipantModel.findOne(filter).populate('participants.player_id', 'username').sort({'participants.score' : -1});
    return result
}

const updateParticipants = async(filter : FilterQuery<IParticipantsList>, data : UpdateQuery<IParticipantsList>)=>{
    const result = await ParticipantModel.updateOne(filter,data);
    return result;
}


const create = async(participantsList : IParticipantsList)=>{
    const result = await ParticipantModel.create(participantsList);
    return result;
 }

 export default{
    create,
    updateParticipants,
    findOne,
    aggregation
 }