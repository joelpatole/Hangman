import { model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { categoryType } from "./category.type";


const categorySchema = new BaseSchema({
    categoryName : {
        type : String,
        required : true,
        unique : true
    }
})

export const categoryModel = model<categoryType>("Category",categorySchema)
