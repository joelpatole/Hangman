import { NextFunction,Router,Request,Response } from "express";

import { roles } from "../../utility/constants";
import { permit } from "../../utility/authorize";
import { CREATE_NEW_CATEGORY_VALIDATOR } from "./category.validations";
import categoryService from "./category.service";
import { CATEGORY_RESPONSES } from "./category.responses";
import { ResponseHandler } from "../../utility/response.handler";



const router = Router()

router.post('/create-new-caregory',permit([roles.ADMIN]),CREATE_NEW_CATEGORY_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const {categoryName} = req.body;
    const result = await categoryService.createCategory(categoryName);
    if(!result) throw CATEGORY_RESPONSES.COULD_NOT_CREATE
    res.send(new ResponseHandler(result));
  }catch(err){
    next(err);
  }
})


export default router;