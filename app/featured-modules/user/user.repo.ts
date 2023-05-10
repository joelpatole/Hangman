import { FilterQuery, UpdateQuery } from "mongoose";
import { IUser } from "./user.type";
import { userModel } from "./user.schema";

const find = (filter: FilterQuery<IUser>) => userModel.find({ isDeleted: false, ...filter });

const findOne = (filter: FilterQuery<IUser>) => userModel.findOne({ isDeleted: false, ...filter });

const create = (user: IUser) => userModel.create(user);

const update = (filter: FilterQuery<IUser>, data: UpdateQuery<IUser>) => userModel.updateMany({ isDeleted: false, ...filter }, data);

export default {
    find,
    findOne,
    create,
    update
}