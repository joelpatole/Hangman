"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const express_1 = require("express");
const response_handler_1 = require("../utility/response.handler");
const authorize_1 = require("../utility/authorize");
const routes_data_1 = require("./routes.data");
const registerRoutes = (app) => {
    app.use((0, express_1.json)());
    app.use((0, authorize_1.tokenValidator)(routes_data_1.excludedPaths));
    for (let route of routes_data_1.routes) {
        app.use(route.path, route.router);
    }
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send(new response_handler_1.ResponseHandler(null, err));
    });
};
exports.registerRoutes = registerRoutes;
//# sourceMappingURL=routes.js.map