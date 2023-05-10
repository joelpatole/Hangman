import { Route } from "./routes.types";
import routers from "../featured-modules/routes.index";
import { ExcludedPath, ExcludedPaths } from "../utility/authorize";


export const routes: Route[] = [
    new Route("/auth", routers.AuthRouter),
    new Route("/role", routers.RoleRouter),
    new Route("/category",routers.CategoryRouter),
    new Route("/words",routers.WordRouter),
    new Route("/tournament",routers.TournamentRouter),
    new Route("/user",routers.UserRouter),
    new Route("/notification",routers.NotificationRouter),
    new Route("/participant",routers.PaticipantsRouter),
    new Route("/comment",routers.CommentRouter),
]

export const excludedPaths: ExcludedPaths = [
    new ExcludedPath("/auth/login", "POST"),
    new ExcludedPath("/auth/register", "POST"),
    // new ExcludedPath("/shop/see-all-shops", "GET"),
    // new ExcludedPath("/shop/get-a-shop/", "GET"),
    // new ExcludedPath("/shop/rate-a-shop", "POST"),
];