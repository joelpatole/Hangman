"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.difficultyLevelHelper = exports.roleHelper = exports.statusHelper = void 0;
const constants_1 = require("./constants");
class StatusHelper {
    convertStringToEnumValue(orderStatus) {
        if (orderStatus === "pending")
            return constants_1.status.pending;
        else if (orderStatus === "approved" || "active")
            return constants_1.status.active;
        else if (orderStatus === "rejected")
            return constants_1.status.rejected;
        else if (orderStatus === 'inactive')
            return constants_1.status.inactive;
        else if (orderStatus === 'in_review')
            return constants_1.status.in_review;
        else
            return constants_1.status.unknown;
    }
    convertEnumValueToString(orderStatus) {
        if (orderStatus === constants_1.status.pending)
            return "pending";
        else if (orderStatus === constants_1.status.active)
            return "active";
        else if (orderStatus === constants_1.status.rejected)
            return "rejected";
        else if (orderStatus === constants_1.status.inactive)
            return "inactive";
        else if (orderStatus === constants_1.status.in_review)
            return "in_review";
        else
            return "no such status";
    }
}
class RoleHelper {
    convertStringToRoleValue(role) {
        if (role === constants_1.rolesInString.ADMIN)
            return constants_1.roles.ADMIN;
        else if (role === constants_1.rolesInString.MODERATOR)
            return constants_1.roles.MODERATOR;
        else if (role === constants_1.rolesInString.USER)
            return constants_1.roles.USER;
        else
            return 0;
    }
    convertRoleValueToString(role) {
        if (role === constants_1.roles.ADMIN)
            return "admin";
        else if (role === constants_1.roles.MODERATOR)
            return "moderator";
        else if (role === constants_1.roles.USER)
            return "user";
        else
            return 'no such role';
    }
}
class DifficultyLevelHelper {
    convertValueToString(level) {
        if (level === 1)
            return 'easy';
        else if (level === 2)
            return 'medium';
        else if (level === 3)
            return 'hard';
        else
            return "no such level";
    }
    convertStringToValue(stringLevel) {
        if (stringLevel == 'easy')
            return constants_1.difficultyLevel.easy;
        else if (stringLevel == 'medium')
            return constants_1.difficultyLevel.medium;
        else if (stringLevel == 'hard')
            return constants_1.difficultyLevel.hard;
        else
            return 0;
    }
}
exports.statusHelper = new StatusHelper();
exports.roleHelper = new RoleHelper();
exports.difficultyLevelHelper = new DifficultyLevelHelper();
//# sourceMappingURL=enumUtil.js.map