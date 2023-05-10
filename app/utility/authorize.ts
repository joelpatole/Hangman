import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getPublicKey } from "./key.generate";

export const tokenValidator = (excludedPaths: ExcludedPath[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (excludedPaths.find(e => {
                if (req.url.includes(e.path)) {
                    console.log(req.url.slice(e.path.length));
                    if(e.params.length === 0) return true;
                    else if(req.url.slice(e.path.length).startsWith("?")) return true;
                    const params = req.url.replace(e.path, "").split("/").slice(1);
                    for (let arr of e.params) {
                        if (JSON.stringify(params) === JSON.stringify(arr)) {
                            return next();
                        }
                    }
                }
            })) {
                return next();
            }
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) return next({ message: "Unauthorize", statusCode: 401 });
            const publicKey = getPublicKey();
            const payload = verify(token, publicKey || "");
            res.locals.user = payload;
            next();
        } catch (error) {
            next(error);
        }
    }
}


export const permit = (roles: number[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { user } = res.locals;
        console.log("user is ", user)
        if (roles.includes(user.role)) return next();
        next({ statusCode: 403, message: "FORBIDDEN" })
    }
}

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
type StringArray = string[]

export class ExcludedPath {
    params : StringArray[];
    constructor(
        public path: string,
        public method: Method,
        ...param: StringArray[]
    ) {
       this.params = param
     }
}
export type ExcludedPaths = ExcludedPath[];

    