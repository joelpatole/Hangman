import { PipelineStage } from "mongoose";
import { notificationModel } from "./notification.schema";
import { INotification } from "./notification.types";


const aggregation = async (pipeline: PipelineStage[]) => {
    return await notificationModel.aggregate(pipeline);
}

const create = async(notificationObject : INotification)=>{
  const result = await notificationModel.create(notificationObject);
  console.log('result in noti repo', result)
  return result;
}


export default{
    create,
    aggregation
}