import { generatePipeline } from "../../utility/pipeline";
import { IUser } from "../user/user.type";
import notificationRepo from "./notification.repo";
import { INotification } from "./notification.types";



const create = async(user : IUser, message : string)=>{
    console.log("user in noti service", user);
    if(user._id){
    const notificationObject : INotification = {
    user_id : user._id,
    username : user.username,
    message : message
    }
   const result = await notificationRepo.create(notificationObject);
   return result;
}
}

const getNotifications = async(query : object)=>{
    const pipeline = await generatePipeline(query);
    pipeline.push({ $sort: { 'createdAt': -1 } });
    if (pipeline.length === 0) pipeline.push({ $match: {} });
    const result = await notificationRepo.aggregation(pipeline);
    const notificationArray = [];
    for(let eachNotification of result){
      notificationArray.push({message : eachNotification.message});
    }
    return notificationArray;
}

export default {
    create,
    getNotifications
}