"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludedPaths = exports.routes = void 0;
const routes_types_1 = require("./routes.types");
const routes_index_1 = __importDefault(require("../featured-modules/routes.index"));
const authorize_1 = require("../utility/authorize");
exports.routes = [
    new routes_types_1.Route("/auth", routes_index_1.default.AuthRouter),
    new routes_types_1.Route("/role", routes_index_1.default.RoleRouter),
    new routes_types_1.Route("/category", routes_index_1.default.CategoryRouter),
    new routes_types_1.Route("/words", routes_index_1.default.WordRouter),
    new routes_types_1.Route("/tournament", routes_index_1.default.TournamentRouter),
    new routes_types_1.Route("/user", routes_index_1.default.UserRouter),
    new routes_types_1.Route("/notification", routes_index_1.default.NotificationRouter),
    new routes_types_1.Route("/participant", routes_index_1.default.PaticipantsRouter),
    new routes_types_1.Route("/comment", routes_index_1.default.CommentRouter),
];
exports.excludedPaths = [
    new authorize_1.ExcludedPath("/auth/login", "POST"),
    new authorize_1.ExcludedPath("/auth/register", "POST"),
    // new ExcludedPath("/shop/see-all-shops", "GET"),
    // new ExcludedPath("/shop/get-a-shop/", "GET"),
    // new ExcludedPath("/shop/rate-a-shop", "POST"),
];
//# sourceMappingURL=routes.data.js.map