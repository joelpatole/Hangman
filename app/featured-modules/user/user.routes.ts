import { Router, Request, Response, NextFunction } from "express";
import { permit } from "../../utility/authorize";
import { roles } from "../../utility/constants";
import userService from "./user.service";
import { USER_RESPONSES } from "./user.response";
import { ResponseHandler } from "../../utility/response.handler";

const router = Router()

router.get("/userDashboard",permit([roles.USER]),async(req:Request,res:Response,next : NextFunction)=>{
   try{
    const queryType = req.query;
    const result = await userService.getAllTournaments(queryType);
    if(!result) throw USER_RESPONSES.COULD_NOT_FETCH;
    res.send(new ResponseHandler(result));
   }catch(err){
    next(err)
   }
})

export default router