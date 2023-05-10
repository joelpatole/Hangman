import mongoose, { Schema, Types } from "mongoose"
import categoryService from "../category/category.service"
import wordRepo from "./word.repo"
import { WORD_RESPONSES } from "./word.responses"
import { IWord } from "./word.type"
import { difficultyLevelHelper } from "../../utility/enumUtil"
import { generatePipeline } from "../../utility/pipeline"
import tournamentService from "../tournaments/tournament.service"

const find = async (query: object) => {
    const pipeline = await generatePipeline(query);
    if (pipeline.length === 0) pipeline.push({ $match: {} });
    return wordRepo.aggregation(pipeline);
  };



const addNewWord = async(wordDoc : IWord)=>{
   try{
    if(typeof wordDoc.difficulty == 'string'){
      const difficultyLevelInString = String(wordDoc.difficulty)
      wordDoc.difficulty = difficultyLevelHelper.convertStringToValue(difficultyLevelInString)
    }
     const existingWord = await wordRepo.findOne(wordDoc.word)
     if(existingWord){
        let errString = ""
              for(let j=0;j<wordDoc.category.length;j++){
                if(existingWord.category.toString().includes(wordDoc.category[j].toString())){

                  errString = errString + " " + `unselect ${wordDoc.category[j]} because it is already present`
                }else{
                    const objId = await categoryService.findOne({_id: wordDoc.category[j]});
                    await wordRepo.updateOne({_id: existingWord._id}, {$push: {category: objId?._id}});
                }  
              } 
            }else{
                await wordRepo.addNewWord(wordDoc);
            }
            const result = await wordRepo.findOne(wordDoc.word)
            if(!result)throw WORD_RESPONSES.COULD_NOT_ADD_WORD
            return result
     }catch(err){
        throw err
     }
}

const getGameWords = async(tournament_id : string)=>{
     const tournament = await tournamentService.findOne(new Types.ObjectId(tournament_id));
     if(tournament){
        const sampleWords = []
        const chunksArray : number[] = []
        const categories = tournament.category;
        console.log(categories);
        console.log(tournament.tounament_words)
        if(tournament.tounament_words){
        const numberOfWordsToFind = 10 - tournament.tounament_words?.length
         for(let i=1;i<=categories.length;i++){
           if(i !== categories.length && categories.length !== 1){
              chunksArray.push(Math.floor(numberOfWordsToFind/categories.length))
           }else{
             chunksArray.push(Math.ceil(numberOfWordsToFind/categories.length))
           }
         }
        }
        for(let chunk = 0; chunk < chunksArray.length;chunk++){
          const pipline = [
            { $match: { category: { $elemMatch: { $eq: categories[chunk] } },difficulty: tournament.difficulty } },
            { $sample:{size : chunksArray[chunk]}}
          ]
          const result = await wordRepo.aggregation(pipline);
          sampleWords.push(...result)
        }
        if(tournament.tounament_words){
          tournament.tounament_words.forEach(word => {
            sampleWords.push(word);
          });
        }
        return [...sampleWords]
     }
}

export default{
    addNewWord,
    find,
    getGameWords
}

