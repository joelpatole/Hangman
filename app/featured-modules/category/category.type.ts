import { Schema } from "mongoose";


export interface ICategory{
    _id? : Schema.Types.ObjectId;
    categoryName : string,
}

export type categoryType = ICategory & Document