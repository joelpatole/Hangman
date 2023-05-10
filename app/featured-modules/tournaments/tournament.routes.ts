import { Router,Request,Response,NextFunction } from "express";
import { permit } from "../../utility/authorize";
import { roles } from "../../utility/constants";
import tournamentService from "./tournament.service";
import { TOURNAMENT_RESPONSES } from "./tournament.responses";
import { ResponseHandler } from "../../utility/response.handler";
import { CREATE_TOURNAMENT_VALIDATION, END_TOURNAMENT_VALIDATION, JOIN_A_TOURNAMENT_VALIDATION, SEND_IMPROVEMENTS_VALIDATION, UPDATE_STATUS_VALIDATION } from "./tournament.validations";
import participantsRepo from "../participants/participants.repo";
import participantsService from "../participants/participants.service";
import { Types } from "mongoose";


const router = Router()

router.post("/create-tournament",permit([roles.USER]),CREATE_TOURNAMENT_VALIDATION,async(req:Request,res:Response,next:NextFunction)=>{
    try{
      const result = await tournamentService.createATournament(req.body);
      if(!result) throw TOURNAMENT_RESPONSES.COULD_NOT_CREATE_TOURNAMENT
      res.send(new ResponseHandler(result));
    }catch(err){
        next(err)
    }
})

router.patch("/send-improvement-message",permit([roles.USER,roles.ADMIN]),SEND_IMPROVEMENTS_VALIDATION,async(req:Request,res:Response,next:NextFunction)=>{
 try{
  console.log("current user_id is :", res.locals.user.id)
  const currentUser = res.locals.user
  const tounament_id = req.body.tournament_id;
  const improvementMessage = req.body.message;
  const result = await tournamentService.updateImprovements(currentUser,tounament_id,improvementMessage);
  if(!result) throw TOURNAMENT_RESPONSES.COULD_NOT_ADD_IMPROVEMENTS;
  res.send(result)

 }catch(err){
  next(err)
 }
})


router.post('/join-a-tournament',permit([roles.USER]),JOIN_A_TOURNAMENT_VALIDATION,async(req:Request,res:Response,next : NextFunction)=>{
  try{
    const {tournament_id} = req.body;
    const {player_id} = req.body
    const result = await tournamentService.addParticipant(tournament_id,player_id)
    if(!result) throw TOURNAMENT_RESPONSES.COULD_NOT_ADD_PARTICIPANT
    res.send(new ResponseHandler(result));
  }catch(err){
    next(err)
  }
})

router.get("/get-all-tournaments",permit([roles.ADMIN]),async(req:Request,res:Response,next : NextFunction)=>{
   try{
    const queryType = req.query;
    const result = await tournamentService.getAllTournaments(queryType);
    if(!result) throw TOURNAMENT_RESPONSES.SOMETHING_WENT_WRONG;
    res.send(new ResponseHandler(result))
   }catch(err){
    next(err);
   }
})


router.get("/get-a-tournament/:id",permit([roles.ADMIN,roles.USER]),async(req:Request,res:Response,next : NextFunction)=>{
  try{
    const {page} = req.query;
    const id = req.params.id
    console.log("id is ",id)
    const result = await tournamentService.getATournament(id)
    if(!result) throw TOURNAMENT_RESPONSES.SOMETHING_WENT_WRONG;
    res.send(new ResponseHandler(result));
  }catch(err){

  }
})

router.patch("/update-tournament-status",permit([roles.ADMIN]),UPDATE_STATUS_VALIDATION,async(req:Request,res:Response,next:NextFunction)=>{
   try{
     const {tournament_id} = req.query;
     const {status} = req.query;
     console.log(tournament_id,status);
     console.log(typeof status)
     console.log(typeof tournament_id)
     if(typeof tournament_id == 'string' && typeof status == 'string'){
      const validTournament_id = new Types.ObjectId(tournament_id);
      const result = await tournamentService.updateTournamentStatus(validTournament_id,status);
      if(!result) throw TOURNAMENT_RESPONSES.SOMETHING_WENT_WRONG
      res.send(new ResponseHandler(result));
     }
     else{
       throw TOURNAMENT_RESPONSES.SOMETHING_WENT_WRONG;
     }
     
   }catch(err){
    next(err)
   }
})

router.patch('/delete-tournament-words',permit([roles.USER]),async(req:Request,res:Response,next :NextFunction)=>{
  try{
    const word = req.query.word;
    const tournament_id = req.query.tournament_id
    const creator = res.locals.user;
    if(typeof word == 'string' && typeof tournament_id == 'string')
    {
      const result = await tournamentService.deleteTournamentWord(word,new Types.ObjectId(tournament_id),creator.id);
      if(!result) throw "something went wrong"
      res.send(new ResponseHandler(result));
    }else{
      throw "input selection not correct"
    }
  }catch(err){
    next(err)
  }
})

router.patch("/end-tournament/:id",permit([roles.USER]),END_TOURNAMENT_VALIDATION,async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const tournament_id = new Types.ObjectId(req.params.id);
    const currentUserID = new Types.ObjectId(res.locals.user.id);
    const result = await tournamentService.endTournament(tournament_id, currentUserID);
    if(!result) throw TOURNAMENT_RESPONSES.SOMETHING_WENT_WRONG
    res.send(new ResponseHandler(result))
  }catch(err){
    next(err)
  }
})





//testing route
router.post("/create-participants",permit([roles.ADMIN,roles.USER]),async(req:Request,res:Response,next:NextFunction)=>{
   const {tournament_id} = req.body;
   const result = participantsService.createParticipants(tournament_id);
   res.send(result);
})



export default router