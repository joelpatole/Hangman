"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleData = exports.moderatorData = exports.adminData = exports.rolesInString = exports.roles = exports.status = exports.difficultyLevel = exports.Paggination = void 0;
var Paggination;
(function (Paggination) {
    Paggination[Paggination["count"] = 3] = "count";
})(Paggination = exports.Paggination || (exports.Paggination = {}));
var difficultyLevel;
(function (difficultyLevel) {
    difficultyLevel[difficultyLevel["easy"] = 1] = "easy";
    difficultyLevel[difficultyLevel["medium"] = 2] = "medium";
    difficultyLevel[difficultyLevel["hard"] = 3] = "hard";
})(difficultyLevel = exports.difficultyLevel || (exports.difficultyLevel = {}));
var status;
(function (status) {
    status[status["pending"] = 1] = "pending";
    status[status["active"] = 2] = "active";
    status[status["inactive"] = 3] = "inactive";
    status[status["rejected"] = 4] = "rejected";
    status[status["in_review"] = 5] = "in_review";
    status[status["unknown"] = 6] = "unknown";
})(status = exports.status || (exports.status = {}));
exports.roles = {
    ADMIN: 1,
    MODERATOR: 2,
    USER: 3
};
exports.rolesInString = {
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    USER: 'user'
};
exports.adminData = [
    {
        name: "admin",
        email: "admin@gmail.com",
        password: "12345",
        username: 'admin123',
        role: exports.roles.ADMIN
    }
];
exports.moderatorData = [
    {
        name: "moderator",
        email: "moderator@gmail.com",
        password: "12345",
        username: "moderator123",
        role: exports.roles.MODERATOR
    }
];
exports.roleData = [
    {
        _id: exports.roles.ADMIN,
        name: "admin"
    },
    {
        _id: exports.roles.MODERATOR,
        name: "moderator"
    },
    {
        _id: exports.roles.USER,
        name: "user"
    }
];
//# sourceMappingURL=constants.js.map