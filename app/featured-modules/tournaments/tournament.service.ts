import mongoose, { FilterQuery, Types, UpdateQuery } from "mongoose";
import { difficultyLevelHelper, statusHelper } from "../../utility/enumUtil";
import tournamentRepo from "./tournament.repo";
import { ITournament } from "./tournament.type";
import userService from "../user/user.service";
import { roles, status } from "../../utility/constants";
import { IParticipantsList, IPlayer } from "../participants/participants.type";
import participantsService from "../participants/participants.service";
import { TOURNAMENT_RESPONSES } from "./tournament.responses";
import { generatePipeline } from "../../utility/pipeline";
import categoryService from "../category/category.service";
import { IWord } from "../word/word.type";
import wordService from "../word/word.service";
import notificationServices from "../notifications/notification.services";
import {
  createTournamentNotification,
  tournamentNotification,
} from "../notifications/notification.constants";
import commentServices from "../comments/comment.services";


const findOne = async(tournament_id : Types.ObjectId)=>{
  const tournament = await tournamentRepo.findOne(tournament_id);
  return tournament;
}

const createATournament = async (tournament: ITournament) => {
  tournament.difficulty = difficultyLevelHelper.convertStringToValue(
    String(tournament.difficulty)
  );
  const result = await tournamentRepo.createATournament(tournament);
  const creator = await userService.findOne({ _id: result?.creator_id });
  console.log("creator : ", creator);
  if (creator && result?.status) {
    const message = createTournamentNotification(
      tournament!.name,
      result.status
    );
    await notificationServices.create(creator, message);
  }
  return result;
};

const updateImprovements = async (
  currentUser: any,
  tournament_id: string,
  message: string
) => {
  const currentUserID = new mongoose.Types.ObjectId(currentUser.id);
  const currentUserDetails = await userService.findOne({ _id: currentUserID });
  console.log("currentUserDetails ", currentUserDetails);
  const improvementString = `${currentUserDetails?.username} : ${message}`;
  await tournamentRepo.update(
    { _id: tournament_id },
    { $push: { improvements: improvementString } }
  );

  if (currentUserDetails?.role === roles.ADMIN)
    await tournamentRepo.update({ _id: tournament_id }, [
      { $set: { status: status.in_review } },
    ]);

  const result = await tournamentRepo.getATournament({ _id: tournament_id });
  if (result?.status != undefined) {
    const stringStatus = statusHelper.convertEnumValueToString(result?.status);
    const finalResult = {
      tournamentStatus: stringStatus,
      TounamentDetails: result,
    };
    return finalResult;
  }
};

const addParticipant = async (tournament_id: string, player_id: string) => {
  const tournament = await tournamentRepo.getATournament({
    _id: tournament_id,
  });
  console.log(tournament);
  if (tournament?.status === status.active) {
    const player: IPlayer = {
      player_id: Object(player_id),
    };
    const result = await participantsService.addParticipant(
      Object(tournament_id),
      player
    );
    return result;
  } else {
    throw TOURNAMENT_RESPONSES.TOURNAMENT_NOT_ACTIVE;
  }
};

const getAllTournaments = async (query: object) => {
  console.log(query);
  const finalResult = [];
  let categoryArray = [];
  const pipeline = await generatePipeline(query);
  if (pipeline.length === 0) pipeline.push({ $match: {} });
  const result = await tournamentRepo.aggregation(pipeline);
  for (let tournament of result) {
    for (let eachCategory of tournament.category) {
      const category = await categoryService.findOne({ _id: eachCategory });
      categoryArray.push(category?.categoryName);
    }
    let final = {
      tournament_id: tournament._id,
      tournamentName: tournament.name,
      difficulty: tournament.difficulty,
      category: categoryArray,
    };
    finalResult.push(final);
    categoryArray = [];
  }
  return finalResult;
};

const getATournament = async (id: string) => {
  let difficultyString = "";
  const tounament_id = new Types.ObjectId(id);
  const tournament = await tournamentRepo.getATournament({ _id: tounament_id });
  if (tournament?.difficulty !== undefined) {
    difficultyString = difficultyLevelHelper.convertValueToString(
      tournament?.difficulty
    );
  }
  const leaderBoard = await participantsService.getLeaderboard(tounament_id);
  const finalResult = {
    tournamentName: tournament?.name,
    categories: tournament?.category,
    difficulty: difficultyString,
    participants: leaderBoard[0]?.participants?.length,
    leaderBoard: leaderBoard,
  };
  return finalResult;
};

const updateTournamentStatus = async (
  tournament_id: Types.ObjectId,
  inputStatus: string
) => {
  const statusValue = statusHelper.convertStringToEnumValue(inputStatus);
  const updateResult = await tournamentRepo.update({ _id: tournament_id }, [
    { $set: { status: statusValue } },
  ]);
  if (updateResult.modifiedCount == 1 && statusValue == status.active) {
    const result = await participantsService.createParticipants(
      String(tournament_id)
    );
    await commentServices.create(tournament_id);
    // console.log(result)
    const tournament = await tournamentRepo.getATournament({
      _id: tournament_id,
    });
    console.log(tournament);
    if (tournament?.tounament_words !== undefined) {
      console.log("????", tournament.tounament_words);
      const categoryArray = [];
      for (let eachWord of tournament?.tounament_words) {
        const word = eachWord.word;
        const category = eachWord.category;
        console.log(eachWord.category);
        const difficulty = tournament.difficulty;
        if (eachWord.category && Array.isArray(category)) {
          for (let i = 0; i < eachWord.category.length; i++) {
            categoryArray.push(eachWord.category[i]);
          }
        }
        const obj = JSON.stringify(categoryArray);
        const obj2 = JSON.parse(obj);
        console.log(obj2);
        const arrayOfMongoIds: mongoose.Schema.Types.ObjectId[] = [];
        obj2.forEach((element: { _id: any }) => {
          console.log(element._id);
          arrayOfMongoIds.push(element._id);
        });
        console.log(arrayOfMongoIds);
        const wordDoc: IWord = {
          word: word,
          difficulty: difficulty,
          category: arrayOfMongoIds,
        };
        const addWordResult = wordService.addNewWord(wordDoc);
        console.log(addWordResult);
      }
    }
    const creator = await userService.findOne({ _id: tournament?.creator_id });
    console.log("creator : ", creator);
    if (creator && tournament?.status) {
      const message = createTournamentNotification(
        tournament!.name,
        tournament.status
      );
      await notificationServices.create(creator, message);
    }
    return updateResult;
  } else {
    return updateResult;
  }
};

const deleteTournamentWord = async (
  word: string,
  tournament_id: Types.ObjectId,
  creator_id: Types.ObjectId
) => {
  let result = null;
  const tournament = await tournamentRepo.getATournament({
    _id: tournament_id,
  });
  if (tournament && tournament.creator_id.toString() == creator_id.toString()) {
  if (tournament.status == status.in_review ||tournament.status == status.pending){
      const tournamentWords = tournament.tounament_words;
      if (tournamentWords !== undefined) {
        tournamentWords.forEach(async (wordObject) => {
          if (wordObject.word == word) {
            const index = tournamentWords.indexOf(wordObject);
            const newtournamentWordsArray = tournamentWords.splice(index,1);
            result = await tournamentRepo.update(
              { _id: tournament_id },
              { $set: { tournamentWords: tournamentWords }}
            );
            console.log(result);
          }
        });
        return result;
      }
    }
    return result;
    }else {
    throw "you are not the creator";
  }
};

const endTournament = async(tournament_id : Types.ObjectId, currentUserID : Types.ObjectId)=>{
  const tournament = await tournamentRepo.getATournament({_id : tournament_id});
  if(tournament?.creator_id.toString() == currentUserID.toString()){
    let result = await tournamentRepo.update({_id : tournament_id},{$set : {status : status.inactive}})
    if(result.modifiedCount > 0){
      const leaderBoard = await participantsService.getLeaderboard(tournament_id);
      console.log(leaderBoard);
      console.log(leaderBoard[0]);
      result = leaderBoard[0]
    }
     const winner = {
      TournamentWinner : result
    };
    return winner;
  }else{
    throw TOURNAMENT_RESPONSES.USER_NOT_VALID
  }
  
}

export default {
  createATournament,
  findOne,
  updateImprovements,
  addParticipant,
  getAllTournaments,
  getATournament,
  updateTournamentStatus,
  deleteTournamentWord,
  endTournament
};
