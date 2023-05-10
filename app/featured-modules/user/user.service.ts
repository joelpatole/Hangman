import { FilterQuery } from "mongoose";
import { IRole } from "../roles/role.types"
import userRepo from "./user.repo"
import { USER_RESPONSES } from "./user.response"
import { IUser } from "./user.type"
import { roles } from "../../utility/constants";
import tournamentService from "../tournaments/tournament.service";
import notificationServices from "../notifications/notification.services";

const find = (filter: FilterQuery<IUser>) => userRepo.find({ role: roles.USER, ...filter });
const findOne = (filter: FilterQuery<IUser>) => userRepo.findOne(filter);


const create = async(user : IUser)=>{
  try{
    const existingUser = await userRepo.findOne({email : user.email})
    if(existingUser) throw USER_RESPONSES.USER_ALREADY_EXIST;
    const existingUserName = await userRepo.findOne({username: user.username})
    if(existingUserName) throw USER_RESPONSES.USERNAME_ALREADY_EXIST 
    const result = await userRepo.create(user);
    const notificationresult = await notificationServices.create(result, "Account Created");
    console.log("notificationresult : ",notificationresult);
    return result
  }catch(err){
    throw err
  }
}

const getAllTournaments = async(query : object)=>{
    const queryType = {...query, status : 2};
    const result = await tournamentService.getAllTournaments(queryType);
    return result;
}


export default{
    create,
    find,
    findOne,
    getAllTournaments
}
