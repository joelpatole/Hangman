import { FilterQuery, PipelineStage, Types, UpdateQuery } from "mongoose";
import { CommentModel } from "./comment.schema";
import { IComment } from "./comments.type";

const aggregation = async (pipeline: PipelineStage[]) => {
    return await CommentModel.aggregate(pipeline);
}

const create = async(commentObject : IComment)=>{
    const result = await CommentModel.create(commentObject);
    return result;
}

const getAllComments = async(tournament_id : Types.ObjectId)=>{
  const result = await CommentModel.findOne({tournament_id : tournament_id}).elemMatch('comments', { isDeleted: false });
  return result;
}

const update = async(filter: FilterQuery<IComment>, data : UpdateQuery<IComment>)=>{
   const result = CommentModel.updateOne(filter,data);
   return result;
}

const deleteComment = async(tournament_id : Types.ObjectId, comment_id : Types.ObjectId)=>{
    const result = await CommentModel.findOneAndUpdate(
        {
            tournament_id: tournament_id,
            'comments._id': comment_id
        },
        {
            $set: { 'comments.$.isDeleted': true }
        },
        {
            new: true,
        },
    )
    return result;
}


export default{
    getAllComments,
    update,
    create,
    aggregation,
    deleteComment
}