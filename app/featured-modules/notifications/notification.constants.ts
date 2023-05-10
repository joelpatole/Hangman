import { Types } from "mongoose";
import { status } from "../../utility/constants";

export const tournamentNotification = {
    TOURNAMENT_ACTIVE : " tournament is now active",
    TOURNAMENT_IN_REVIEW : " tournament is in review",
    TOURNAMENT_REJECTED : " tournament is rejected",
    TOURNAMENT_PENDING : " tournament is in pending state",
}

export const createTournamentNotification= (tournamentName : string | String, tournamentStatus : number | Number)=>{
   if(tournamentStatus == status.active){
       return `${tournamentName}, ${tournamentNotification.TOURNAMENT_ACTIVE}`
   }
   else if(tournamentStatus == status.in_review){
    return `${tournamentName}, ${tournamentNotification.TOURNAMENT_IN_REVIEW}`
   }
   else if(tournamentStatus == status.rejected){
    return `${tournamentName}, ${tournamentNotification.TOURNAMENT_REJECTED}`
   }
   else if(tournamentStatus == status.pending){
    return `${tournamentName}, ${tournamentNotification.TOURNAMENT_PENDING}`    
   }
   else {
    return "status unknown"
   }
}
