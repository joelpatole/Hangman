import { body , param, query} from "express-validator";
import { validate } from "../../utility/validate";

export const CREATE_TOURNAMENT_VALIDATION = [
    body("name").exists().withMessage("name is required"),
    body("creator_id").exists().withMessage("name is required").isMongoId().withMessage("should be a valid mongoID"),
    body("category").exists().withMessage("category of words for tournament should exist"),
    body("difficulty").exists().withMessage("difficulty should exist"),
    body("end_date").exists().withMessage("end date should be mentioned"),
    validate
]

export const SEND_IMPROVEMENTS_VALIDATION = [
   
    body("tournament_id").exists().withMessage("tournament_id is required").isMongoId().withMessage("should be a valid mongoID"),
    body("message").exists().withMessage("improvement message is required"),
    validate
]

export const JOIN_A_TOURNAMENT_VALIDATION = [
    body("tournament_id").exists().withMessage("tournament_id is required").isMongoId().withMessage("should be a valid mongoID"),
    body("player_id").exists().withMessage("player_id should exist").isMongoId().withMessage("player id should be valid"),
    validate
]

export const UPDATE_STATUS_VALIDATION = [
   query("tournament_id").exists().withMessage("tournament id should exist").isMongoId().withMessage("not a vlaid id"),
   query('status').exists().withMessage("status should be present"),
   validate
]

export const END_TOURNAMENT_VALIDATION = [
    param("id").exists().withMessage("tournament_id is required").isMongoId().withMessage("should be a valid mongoID"),
    validate
]