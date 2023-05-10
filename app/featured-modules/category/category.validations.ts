import { body } from "express-validator";
import { validate } from "../../utility/validate"

export const CREATE_NEW_CATEGORY_VALIDATOR = [
    body("categoryName").exists().withMessage("category name is required"),
    validate
]