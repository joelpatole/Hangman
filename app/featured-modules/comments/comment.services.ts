import mongoose, { PipelineStage, Types, mongo } from "mongoose";
import { IComment, ICommentMessage } from "./comments.type";
import commentRepo from "./comment.repo";
import userService from "../user/user.service";
import { COMMENT_RESPONSES } from "./comment.responses";
import notificationServices from "../notifications/notification.services";
import tournamentService from "../tournaments/tournament.service";
import { IUser } from "../user/user.type";

const create = async(tournament_id : Types.ObjectId)=>{
    const commentObject : IComment= {
        tournament_id : Object(tournament_id),
        comments : []
    }
    const result = await commentRepo.create(commentObject);
    return result;
}

const insertComment = async(tournament_id : Types.ObjectId, comment : string, user_id : Types.ObjectId)=>{
  const user = await userService.findOne({_id : user_id});  
  if(user){
    const commetObject : ICommentMessage = {
        username: user.username,
        comment: comment,
        isDeleted: false
    }
    const result = await commentRepo.update({tournament_id : tournament_id},{ $push: { comments: commetObject } })
    return result;
  }else{
    throw COMMENT_RESPONSES.USER_NOT_FOUND;
  }
}

const getAllComments = async(tournament_id : Types.ObjectId)=>{
  const finalResult  : Partial<ICommentMessage>[]= []
  const result = await commentRepo.getAllComments(tournament_id);
  if(result){
    result.comments.forEach((comment) =>{
        const commentObject = {
           username : comment.username,
           comment : comment.comment,
        }
        finalResult.push(commentObject);
      })
  }
  return finalResult
}

const deleteComment = async(tournament_id : Types.ObjectId, comment_id : Types.ObjectId)=>{
    const result = await commentRepo.deleteComment(tournament_id,comment_id);
    const tournament = await tournamentService.findOne(tournament_id);
    let user;
    let comment = ""
    if(result){
        for(let commentObject of result?.comments){
            const stringifiedObject = JSON.stringify(commentObject);
            const parsedObject = JSON.parse(stringifiedObject);
            if(parsedObject._id == comment_id){
                comment = parsedObject.comment
                user = await userService.findOne({username : commentObject.username})
            }  
        }
    }
    if(user){
     await notificationServices.create(user,`Your Comment ${comment} in ${tournament?.name} was deleted`)
    }
    return result
}

export default{
 insertComment,
 create,
 getAllComments,
 deleteComment
}