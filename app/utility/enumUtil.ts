import { difficultyLevel, roles, rolesInString, status } from "./constants";

class StatusHelper
{
    convertStringToEnumValue(orderStatus: string | String): status {  
        if(orderStatus === "pending")
            return status.pending;
        else if(orderStatus === "approved" || "active")
           return status.active;
        else if(orderStatus === "rejected")
            return status.rejected;
        else if(orderStatus === 'inactive')
            return status.inactive;
        else if(orderStatus === 'in_review')
            return status.in_review;        
        else
            return status.unknown; 
    } 

    convertEnumValueToString(orderStatus: Number | number): string {  
        if(orderStatus === status.pending)
            return "pending";
        else if(orderStatus === status.active)
           return "active";
        else if(orderStatus === status.rejected)
            return "rejected";
        else if(orderStatus === status.inactive)
             return "inactive";
        else if(orderStatus === status.in_review)
             return "in_review";         
        else
            return "no such status"; 
    }
}

class RoleHelper{
    convertStringToRoleValue(role: string | String): number | Number {
       if(role === rolesInString.ADMIN)
        return roles.ADMIN
       else if(role === rolesInString.MODERATOR)
        return roles.MODERATOR
       else if(role === rolesInString.USER)
        return roles.USER
       else 
         return 0 
    }

    convertRoleValueToString(role: number | Number): string |  String {
        if(role === roles.ADMIN)
         return "admin"
        else if(role === roles.MODERATOR)
         return "moderator"
        else if(role === roles.USER)
         return "user"
        else 
          return 'no such role' 
     }
}

class DifficultyLevelHelper{
    convertValueToString(level : number | Number){
      if(level === 1) return 'easy'
      else if(level === 2)return 'medium'
      else if(level === 3)return 'hard'
      else return "no such level"
    }

    convertStringToValue(stringLevel : String | string){
        if(stringLevel == 'easy') return difficultyLevel.easy
        else if(stringLevel == 'medium') return difficultyLevel.medium
        else if(stringLevel == 'hard') return difficultyLevel.hard
        else return 0
    }
}

export const statusHelper = new StatusHelper(); 
export const roleHelper = new RoleHelper();
export const difficultyLevelHelper = new DifficultyLevelHelper();