import { NextFunction, Router, Request, Response } from "express";
import { roles } from "../../utility/constants";
import { permit } from "../../utility/authorize";
import participantsService from "./participants.service";
import { PARTICIPANT_RESPONSES } from "./participants.responses";


const router = Router();

//validations
router.patch("/insert-score",permit([roles.USER]),async(req:Request,res:Response,next : NextFunction)=>{
try{
    const query = {
        timeTaken : req.query.timeTaken,
        score : req.query.score,
        tournament_id : req.query.tournament_id
    }
    const player_id = res.locals.user.id;
    const result = await participantsService.insertTournamentScore(query,player_id);
    if(!result) throw PARTICIPANT_RESPONSES.COULD_NOT_FETCH_PATRICIPANT
    res.send(result)
  
}catch(err){
    next(err);
}
})


export default router;
