import { FilterQuery } from "mongoose";
import categoryRepo from "./category.repo";
import { CATEGORY_RESPONSES } from "./category.responses";
import { ICategory } from "./category.type";

const findOne = async(filter : FilterQuery<ICategory>)=>{
    const result = await categoryRepo.findOne({...filter})
    return result;
}

const createCategory = async(categoryName : string)=>{
    try{
        const newCategory : ICategory = {
            categoryName : categoryName.toLowerCase()
        }
        const existingCategory = await categoryRepo.findOne({categoryName:categoryName.toLowerCase()})
        if(existingCategory) throw CATEGORY_RESPONSES.CATEGORY_EXISTS;
        
        const result = await categoryRepo.createCategory(newCategory);
        return result;
    }catch(err){
        throw(err);
    }
}


export default{
    createCategory,
    findOne
}