import { FilterQuery, Schema } from "mongoose";
import roleRepo from "./role.repo";
import { IRole } from "./role.types";
import { RoleResponses } from "./role.response";

const add = async (role: IRole) => {
    try {
        const oldRole = await roleRepo.findOne({_id: role._id});
        if(oldRole) throw RoleResponses.ROLE_ALREADY_EXIST;
        return roleRepo.add(role);
    } catch (err) {
        throw err;
    }
}

const remove = async(id:string)=>{
    try{
        const role = await roleRepo.findOne({_id:Number(id)});
        if(!role) throw RoleResponses.ROLE_NOT_FOUND
        return roleRepo.remove(Number(id));
    }catch(err){
        throw err;
    }
}

const findOne = async(_id : Number | undefined)=>{
    try{
        if(_id == undefined)
        {
            throw RoleResponses.ROLE_NOT_FOUND
        }
        else
        {
            const role = await roleRepo.findOne({_id});
            if(!role) throw RoleResponses.ROLE_NOT_FOUND
            return role
        }
        
    }catch(err){
        throw err
    }
}

export default{
    add,
    remove,
    findOne
}