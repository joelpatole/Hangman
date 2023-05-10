import { body } from "express-validator";
import { validate } from "../utility/validate";

export const USER_REGISTRATION_VALIDATOR = [
    body("name").exists().withMessage("name is required"),
    body("email").exists().withMessage("email is required").isEmail().withMessage("email sould be a valid email"),
    body("password").exists().withMessage("password is required").isLength({min : 3}).withMessage("length should be atleast 3"),
    body("username").exists().withMessage("username is required").isLength({min : 3}).withMessage("length should be atleast 3"),
    validate
]
export const EMPLOYEE_REGISTRATION_VALIDATOR = [
    body("name").exists().withMessage("name is required"),
    body("email").exists().withMessage("email is required").isEmail().withMessage("email sould be a valid email"),
    body("password").exists().withMessage("password is required").isLength({min : 3}).withMessage("length should be atleast 3"),
    body("username").exists().withMessage("username is required").isLength({min : 3}).withMessage("length should be atleast 3"),
    body('role').exists().withMessage("role is required"),
    validate
]

export const LOGIN_VALIDATION = [
    body("email").exists().withMessage("email is required").isEmail().withMessage("email sould be a valid email"),
    body("password").exists().withMessage("password is required").isLength({min : 3}).withMessage("length should be atleast 3"),
    validate
]