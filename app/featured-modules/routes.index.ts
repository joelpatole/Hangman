import RoleRouter from '../featured-modules/roles/role.routes'
import AuthRouter from '../auth/auth.routes'
import CategoryRouter from './category/category.routes'
import WordRouter from './word/word.routes'
import TournamentRouter from './tournaments/tournament.routes'
import UserRouter from "./user/user.routes"
import NotificationRouter from "./notifications/notification.routes"
import PaticipantsRouter from './participants/participants.routes'
import CommentRouter from './comments/comment.routes'
export default{
    RoleRouter,
    AuthRouter,
    CategoryRouter,
    WordRouter,
    TournamentRouter,
    UserRouter,
    NotificationRouter,
    PaticipantsRouter,
    CommentRouter
}