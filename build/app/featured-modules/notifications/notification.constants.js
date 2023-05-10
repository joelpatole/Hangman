"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTournamentNotification = exports.tournamentNotification = void 0;
const constants_1 = require("../../utility/constants");
exports.tournamentNotification = {
    TOURNAMENT_ACTIVE: " tournament is now active",
    TOURNAMENT_IN_REVIEW: " tournament is in review",
    TOURNAMENT_REJECTED: " tournament is rejected",
    TOURNAMENT_PENDING: " tournament is in pending state",
};
const createTournamentNotification = (tournamentName, tournamentStatus) => {
    if (tournamentStatus == constants_1.status.active) {
        return `${tournamentName}, ${exports.tournamentNotification.TOURNAMENT_ACTIVE}`;
    }
    else if (tournamentStatus == constants_1.status.in_review) {
        return `${tournamentName}, ${exports.tournamentNotification.TOURNAMENT_IN_REVIEW}`;
    }
    else if (tournamentStatus == constants_1.status.rejected) {
        return `${tournamentName}, ${exports.tournamentNotification.TOURNAMENT_REJECTED}`;
    }
    else if (tournamentStatus == constants_1.status.pending) {
        return `${tournamentName}, ${exports.tournamentNotification.TOURNAMENT_PENDING}`;
    }
    else {
        return "status unknown";
    }
};
exports.createTournamentNotification = createTournamentNotification;
//# sourceMappingURL=notification.constants.js.map