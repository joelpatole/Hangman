import { Application, NextFunction, Request, Response, json } from "express";
import { ResponseHandler } from "../utility/response.handler";
import { tokenValidator,  } from "../utility/authorize";
import { excludedPaths, routes } from "./routes.data";


export const registerRoutes = (app: Application) => {

    app.use(json());
    app.use(tokenValidator(excludedPaths))
    for(let route of routes){
        app.use(route.path, route.router);
    }

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(err.statusCode || 500).send(new ResponseHandler(null, err));
    })

}