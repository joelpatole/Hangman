import { Router,Request,Response,NextFunction } from "express";
import { permit } from "../../utility/authorize";
import { roles } from "../../utility/constants";
import { INSERT_COMMENT_VALIDATION } from "./comment.validation";
import commentServices from "./comment.services";
import { Types } from "mongoose";
import { COMMENT_RESPONSES } from "./comment.responses";
import { ResponseHandler } from "../../utility/response.handler";


const router = Router()

router.patch('/insert-comment',permit([roles.USER]),INSERT_COMMENT_VALIDATION,async(req:Request,res:Response,next: NextFunction)=>{
   try{
    const tournament_id = req.query.tournament_id;
    const comment = req.query.comment;
    const user_id = res.locals.user.id;
    console.log(user_id);
   if(typeof comment == 'string'){
    const result = await commentServices.insertComment(Object(tournament_id),comment,user_id);
    if(!result) throw COMMENT_RESPONSES.SOMETHING_WENT_WRONG
    res.send(new ResponseHandler(result)); 
   }
   }catch(err){
    next(err);
   }
})

router.get("/see-comments/:id",permit([roles.ADMIN,roles.MODERATOR,roles.USER]),async(req:Request,res:Response,next:NextFunction)=>{
    try{
      const tournament_id = new Types.ObjectId(req.params.id);
      const result = await commentServices.getAllComments(tournament_id);
      if(!result) throw COMMENT_RESPONSES.SOMETHING_WENT_WRONG
      res.send(new ResponseHandler(result));
    }catch(err){
        next(err);
    }
})

router.patch("/delete-comment",permit([roles.MODERATOR]),async(req:Request,res:Response,next :NextFunction)=>{
  try{ 
    if(typeof req.query.tournament_id == 'string' && typeof req.query.comment_id == 'string'){
        const result = await commentServices.deleteComment(new Types.ObjectId(req.query.tournament_id),new Types.ObjectId(req.query.comment_id))
   if(!result) throw COMMENT_RESPONSES.SOMETHING_WENT_WRONG
   res.send(new ResponseHandler(result));
    }
  }catch(err){
    next(err)
  }
})

export default router