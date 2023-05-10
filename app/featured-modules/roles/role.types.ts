import { Schema } from "mongoose";


export interface IRole{
    _id?: number;
    name: string;
};

export type RoleType = Document & IRole;