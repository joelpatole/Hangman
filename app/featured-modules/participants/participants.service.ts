import mongoose, { PipelineStage, Schema, Types } from "mongoose"
import participantsRepo from "./participants.repo"
import { IParticipantsList, IPlayer } from "./participants.type"
import { generatePipeline } from "../../utility/pipeline"

const createParticipants = async(tournament_id : string)=>{
    const participantsList : IParticipantsList = {
        tournament_id : Object(tournament_id)
    }
    return await participantsRepo.create(participantsList);
}

const addParticipant = async(tournament_id : mongoose.Schema.Types.ObjectId, player : IPlayer)=>{
    await participantsRepo.updateParticipants({tournament_id:tournament_id},{$push: { participants : player}})
    const result = await participantsRepo.findOne({tournament_id : tournament_id})
    return result
 }

 const getLeaderboard = async(tournament_id : Types.ObjectId)=>{
//    const remaining = {
//      $match: { tournament_id: new Types.ObjectId(tournament_id) },
//      $unwind: '$participants' ,
//      $sort: { 'participants.score': -1 } 
//    }
//     const query = { page: 1,limit: 1 ,...remaining};
//     console.log(query)
//     const pipeline = generatePipeline(query);
//     console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
//     console.log(pipeline)
    const pipelineQuery : PipelineStage[] = [  
        { $match: { tournament_id: new Types.ObjectId(tournament_id) } },
        { $unwind: '$participants' },
        { $sort: { 'participants.score': -1, 'participants.totalTimeTaken': 1 } },
        { $project : {'participants.player_id' : 1, 'participants.score' : 1, 'participants.totalTimeTaken' : 1 , '_id' : 0}}
    ] 
    const leaderBoard = await participantsRepo.aggregation(pipelineQuery);  
    return leaderBoard;
 }

const insertTournamentScore = async(query : any, player_id : Types.ObjectId)=>{
    let result = null;
    const tournamentParticipants = await participantsRepo.findOne({tournament_id : query.tournament_id}) 
    if(tournamentParticipants?.participants?.length !== undefined){
        for(let singlePlayer of tournamentParticipants?.participants){
            const playerInString = JSON.stringify(singlePlayer.player_id);
            const playerInJson = JSON.parse(playerInString) 
            if(playerInJson._id.toString() == player_id.toString()){
                singlePlayer.score = query.score;
                singlePlayer.totalTimeTaken = query.timeTaken;

                result = await participantsRepo.updateParticipants({ tournament_id: query.tournament_id, "participants.player_id": player_id },
                { $set: { "participants.$.score": singlePlayer.score, "participants.$.totalTimeTaken": singlePlayer.totalTimeTaken } },)
            }
        }
        return result;
    }
}

 export default{
    createParticipants,
    addParticipant,
    getLeaderboard,
    insertTournamentScore

 }