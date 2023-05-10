import { NextFunction, Router,Request,Response } from "express";
import { permit } from "../../utility/authorize";
import { roles, rolesInString } from "../../utility/constants";
import wordService from "./word.service";
import { WORD_RESPONSES } from "./word.responses";
import { ResponseHandler } from "../../utility/response.handler";
import { ADD_NEW_WORD_VALIDATOR } from "./word.validations";



const router = Router()

router.post('/add-new-word',permit([roles.ADMIN]),ADD_NEW_WORD_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
   try{ 
     const wordDoc = req.body;
     const result = await wordService.addNewWord(wordDoc)
     if(!result) throw WORD_RESPONSES.COULD_NOT_ADD_WORD
     res.send(new ResponseHandler(result));
   }catch(err){
    next(err)
   }
})

router.get("/get-words",permit([roles.ADMIN]),async(req:Request,res:Response,next:NextFunction)=>{
    const queryType = req.query;
    const result = await wordService.find(req.query);
    if(!result) throw WORD_RESPONSES.COULD_NOT_FETCH_WORDS;
    res.send(new ResponseHandler(result));

})

router.get("/get-game-words",permit([roles.USER]),async(req:Request,res:Response,next:NextFunction)=>{
  try{
    console.log("OK")
    const tournament_id = String(req.query.tournament_id);
    const result = await wordService.getGameWords(tournament_id)
    res.send(new ResponseHandler(result));
  }catch(err){
    next(err);
  }
})





export default router