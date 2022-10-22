"use strict";
// this file createws the xclosure for protected route
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("./jwt");
// import { pemrTypes } from "../models"
const lodash_1 = __importDefault(require("lodash"));
/**
 * This is closure for route function
 * @<Body> is type oi req body that is sent
 * @<return> is type of return the inner function gives
 * @param route This route function in api directory of page
 * @param permitedRoles arraay role who have access for this route
 * @authVerify : this is callback function accepts the auth object as argument (auth is the one which you put in JWT payload this is optional)
 * @returns route function which is used in api of next
 */
const protectedRouteMaster = (route, permitedRoles, authVerify) => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (process.env.LOG_REQUEST == "true") {
            console.log("headers", JSON.stringify(req.headers));
            console.log("body", JSON.stringify(req.body));
        }
        let statusCode = 500;
        try {
            yield jwt_1.validateUser(req, res).then((r) => r);
            let body = lodash_1.default.omit(req.body, "pemrAuth");
            let auth = lodash_1.default.pick(req.body, "pemrAuth").pemrAuth;
            console.log("auth", JSON.stringify(auth));
            if (authVerify) {
                const verified = yield authVerify(auth);
                if (!verified) {
                    statusCode = 403;
                    throw (new Error().message = "Forbidden");
                }
            }
            if (permitedRoles !== undefined) {
                if (permitedRoles.indexOf(auth.role) < 0) {
                    statusCode = 403;
                    throw (new Error().message = "Forbidden");
                }
            }
            let routeReturn = yield route(req, res, body, auth);
        }
        catch (error) {
            res.status(statusCode).send(error);
        }
    });
};
exports.default = protectedRouteMaster;
//# sourceMappingURL=protectedRouteMaster.js.map