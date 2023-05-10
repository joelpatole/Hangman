"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcludedPath = exports.permit = exports.tokenValidator = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const key_generate_1 = require("./key.generate");
const tokenValidator = (excludedPaths) => {
    return (req, res, next) => {
        var _a;
        try {
            if (excludedPaths.find(e => {
                if (req.url.includes(e.path)) {
                    console.log(req.url.slice(e.path.length));
                    if (e.params.length === 0)
                        return true;
                    else if (req.url.slice(e.path.length).startsWith("?"))
                        return true;
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
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!token)
                return next({ message: "Unauthorize", statusCode: 401 });
            const publicKey = (0, key_generate_1.getPublicKey)();
            const payload = (0, jsonwebtoken_1.verify)(token, publicKey || "");
            res.locals.user = payload;
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.tokenValidator = tokenValidator;
const permit = (roles) => {
    return (req, res, next) => {
        const { user } = res.locals;
        console.log("user is ", user);
        if (roles.includes(user.role))
            return next();
        next({ statusCode: 403, message: "FORBIDDEN" });
    };
};
exports.permit = permit;
class ExcludedPath {
    constructor(path, method, ...param) {
        this.path = path;
        this.method = method;
        this.params = param;
    }
}
exports.ExcludedPath = ExcludedPath;
//# sourceMappingURL=authorize.js.map