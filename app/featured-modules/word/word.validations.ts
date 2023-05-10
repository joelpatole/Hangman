import { body } from "express-validator";
import { validate } from "../../utility/validate";


export const ADD_NEW_WORD_VALIDATOR = [
    body("word").exists().withMessage("word is required"),
    body("difficulty").exists().withMessage("difficulty level is required"),
    body("category").exists().withMessage("category is required"),
    validate
]

