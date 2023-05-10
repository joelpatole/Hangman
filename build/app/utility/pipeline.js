"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePipeline = void 0;
const mongoose_1 = require("mongoose");
const generatePipeline = (query) => {
    const pipeline = [];
    const { page, limit, sort, order } = query, remaining = __rest(query, ["page", "limit", "sort", "order"]);
    for (let key in remaining) {
        if (remaining[key].length === 24)
            remaining[key] = new mongoose_1.Types.ObjectId(remaining[key]);
        else if (parseInt(remaining[key]))
            remaining[key] = parseInt(remaining[key]);
        else if (remaining[key] === "true" || remaining[key] === "false") {
            remaining[key] === "true"
                ? (remaining[key] = true)
                : (remaining[key] = false);
        }
        else
            remaining[key];
        pipeline.push({
            $match: {
                [key]: remaining[key],
            },
        });
    }
    const pageNo = page ? +page : 1;
    const limitNo = limit ? +limit : 3;
    const skipNo = (pageNo - 1) * limitNo;
    pipeline.push({
        $skip: skipNo,
    });
    pipeline.push({
        $limit: limitNo,
    });
    if (sort) {
        pipeline.push({
            $sort: {
                [sort]: order === "desc" ? -1 : 1,
            },
        });
    }
    return pipeline;
};
exports.generatePipeline = generatePipeline;
//# sourceMappingURL=pipeline.js.map