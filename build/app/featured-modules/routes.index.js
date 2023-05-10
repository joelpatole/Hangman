"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const role_routes_1 = __importDefault(require("../featured-modules/roles/role.routes"));
const auth_routes_1 = __importDefault(require("../auth/auth.routes"));
const category_routes_1 = __importDefault(require("./category/category.routes"));
const word_routes_1 = __importDefault(require("./word/word.routes"));
const tournament_routes_1 = __importDefault(require("./tournaments/tournament.routes"));
const user_routes_1 = __importDefault(require("./user/user.routes"));
const notification_routes_1 = __importDefault(require("./notifications/notification.routes"));
const participants_routes_1 = __importDefault(require("./participants/participants.routes"));
const comment_routes_1 = __importDefault(require("./comments/comment.routes"));
exports.default = {
    RoleRouter: role_routes_1.default,
    AuthRouter: auth_routes_1.default,
    CategoryRouter: category_routes_1.default,
    WordRouter: word_routes_1.default,
    TournamentRouter: tournament_routes_1.default,
    UserRouter: user_routes_1.default,
    NotificationRouter: notification_routes_1.default,
    PaticipantsRouter: participants_routes_1.default,
    CommentRouter: comment_routes_1.default
};
//# sourceMappingURL=routes.index.js.map