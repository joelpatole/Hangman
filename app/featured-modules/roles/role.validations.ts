import { body } from "express-validator";
import { validate } from "../../utility/validate";

export const CREATE_ROLE_VALIDATION = [
    body("id").exists().withMessage("id is required"),
    body("name").exists().withMessage("name is required"),
    validate
]