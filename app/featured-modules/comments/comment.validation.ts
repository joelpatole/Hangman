import { body, param, query } from "express-validator";
import { validate } from "../../utility/validate";

export const INSERT_COMMENT_VALIDATION = [
    query("tournament_id").exists().withMessage("tournament_id is required").isMongoId().withMessage("should be a valid mongoID"),
    query("comment").exists().withMessage("comment should exist"),
    validate
]

export const GET_COMMENTS_VALIDATION = [
    param("tournament_id").exists().withMessage("tournament_id is required").isMongoId().withMessage("should be a valid mongoID"),
    validate
]