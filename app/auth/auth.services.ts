import { compare, genSalt, hash } from "bcryptjs";
import { IUser } from "../featured-modules/user/user.type";
import userService from "../featured-modules/user/user.service";
import roleServices from "../featured-modules/roles/role.services";
import { ICredentials } from "./auth.types";
import { AUTH_RESPONSES } from "./auth.response";
import { getPrivateKey } from "../utility/key.generate";
import { sign } from "jsonwebtoken";
import { roleHelper } from "../utility/enumUtil";
import { rolesInString } from "../utility/constants";
// import { orderRoleHelper } from "../utility/enumUtil";


const encryptPassword = async (user: IUser) => {
    const salt = await genSalt(10);
    const hashedPassword = await hash(user.password, salt);
    user.password = hashedPassword;
    return user;
}

const register = async (user: IUser, role : string = rolesInString.USER) => {
    if(role != undefined){
        user = await encryptPassword(user);
        const roleValue = roleHelper.convertStringToRoleValue(role);
        user.role = Number(roleValue);
        const result = userService.create(user);
        return result;
    }
    else
    {
        throw AUTH_RESPONSES.ROLE_INCORRECT
    }
}

const login = async (credentials: ICredentials) => {
    const user = await userService.findOne({email: credentials.email});
    const role = await roleServices.findOne(user?.role);
    console.log(user)
    if(!user) throw AUTH_RESPONSES.USER_NOT_FOUND;
    
    const isPasswordMatched = await compare(credentials.password, user.password);
    if(!isPasswordMatched) throw AUTH_RESPONSES.INVALID_CREDENTIALS;

    const privateKey = getPrivateKey();
    console.log("user_id is ",user._id);
    const accessToken = sign({id: user._id, role: user.role}, privateKey, { algorithm: "RS256" });
    console.log(`roleId : ${role._id}, roleName: ${role.name}, accessToken : ${accessToken}`) 
    return {roleId : role._id,roleName: role.name, accessToken};
}



export default{
    register,
    login
}