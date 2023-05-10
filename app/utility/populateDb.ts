import authServices from "../auth/auth.services";
import roleServices from "../featured-modules/roles/role.services";
import { adminData, moderatorData, roleData, rolesInString } from "./constants";

  


export const populate = async () => {
    roleData.forEach(role => roleServices.add(role));
    adminData.forEach(admin => authServices.register(admin,rolesInString.ADMIN));
    moderatorData.forEach(moderator => authServices.register(moderator,rolesInString.MODERATOR));
}