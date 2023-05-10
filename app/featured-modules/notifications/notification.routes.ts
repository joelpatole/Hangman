import { Router, Request,Response,NextFunction } from "express";
import { permit } from "../../utility/authorize";
import { roles } from "../../utility/constants";
import notificationServices from "./notification.services";
import { ResponseHandler } from "../../utility/response.handler";
import { NOTIFICATION_RESPONSES } from "./notification.responses";


const router = Router()

router.get("/get-my-notifications",permit([roles.ADMIN,roles.USER]),async(req:Request,res:Response,next : NextFunction)=>{
   try{ 
    const queryType = req.query;
    const result = await notificationServices.getNotifications(queryType);
    if(!result) throw NOTIFICATION_RESPONSES.COULD_NOT_FETCH_NOTIFICATION;
    res.send(new ResponseHandler(result));
   }catch(err){
    next(err)
   }
})

export default router