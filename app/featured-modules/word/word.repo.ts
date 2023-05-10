import mongoose, { FilterQuery, PipelineStage, Types, UpdateQuery } from "mongoose";
import { wordModel } from "./word.schema";
import { IWord } from "./word.type";

const aggregation = async (pipeline: PipelineStage[]) =>
  wordModel.aggregate(pipeline);

const updateOne = async(filter : FilterQuery<IWord>, data : UpdateQuery<IWord>)=>{
  const result = await wordModel.updateOne(filter,data)
  return result
}

const findOne = async(word : string)=>{
  const result = await wordModel.findOne({word : word})
  return result;
}

const addNewWord = async(wordDoc : IWord)=>{
  const result = await wordModel.create(wordDoc);
  return result
}


export default{
    addNewWord,
    findOne,
    updateOne,
    aggregation,
}