import mongoose, { model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { participantsListType } from "./participants.type";


const participantSchema = new BaseSchema({
    tournament_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true,
        unique : true
      },
    participants : {
       type : [
        {
          player_id : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : 'User'
          },
          score : {
            type : Number,
            required : true,
            default : 0
          },
          totalTimeTaken :{
            type : Number,
            required : true,
            default : -1
          }
        }
       ],
    }
})

export const ParticipantModel = model<participantsListType>('Participant',participantSchema)