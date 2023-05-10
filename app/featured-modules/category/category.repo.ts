import { FilterQuery } from "mongoose";
import { categoryModel } from "./category.schema";
import { ICategory } from "./category.type";


const findOne = async(filter : FilterQuery<ICategory>)=>{
   const result = await categoryModel.findOne({...filter})
   return result;
}

const createCategory = async(category : Partial<ICategory>)=>{
  if(category.categoryName){
    category.categoryName = category.categoryName.toLowerCase();
    const result = await categoryModel.create(category);
    return result;
  }
}

export default{
    findOne,
    createCategory
}