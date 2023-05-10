import { Router,Request,Response,NextFunction } from "express";
import { ResponseHandler } from "../utility/response.handler";
import { EMPLOYEE_REGISTRATION_VALIDATOR, LOGIN_VALIDATION, USER_REGISTRATION_VALIDATOR } from "./auth.validations";
import authServices from "./auth.services";
import { permit } from "../utility/authorize";
import { roles } from "../utility/constants";
import { roleHelper } from "../utility/enumUtil";

const router = Router();

router.post("/register",USER_REGISTRATION_VALIDATOR,async (req:Request, res:Response, next:NextFunction) => {
    try {
        const user = req.body;
        const result = await authServices.register(user);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
});

router.post("/addNewEmployee",permit([roles.ADMIN]),EMPLOYEE_REGISTRATION_VALIDATOR,async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {role,...user} = req.body
        const result = await authServices.register(user,role);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
});

router.post("/login",LOGIN_VALIDATION,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const credentials = req.body;
        const result = await authServices.login(credentials);
        res.send(new ResponseHandler(result));
    }catch(err){
        next(err);
    }
})



export default router;