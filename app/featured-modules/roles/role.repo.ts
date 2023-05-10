import { FilterQuery } from "mongoose";
import { roleModel } from "./role.schema";
import { IRole } from "./role.types";

const add = (role: IRole) => roleModel.create(role);
const findOne = (filter: FilterQuery<IRole>) => roleModel.findOne(filter);

const remove = async(id:number)=>{
   return await roleModel.updateOne({_id:id},{isDeleted : true})
}

export default{
    add,
    findOne,
    remove
}