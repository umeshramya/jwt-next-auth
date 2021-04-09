"use strict";
// this is file contains jwt token functions
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookies_1 = __importDefault(require("cookies"));
const SECRET_AUTH = process.env.SECRET_AUTH || "ramya darling";
const jwtSign = (payload, req, res) => {
    // this fun is for only creating login jwt 
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, SECRET_AUTH, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                reject(err);
            }
            else if (token === undefined) {
                reject("token is undefined");
            }
            else {
                setJwtTokenCookie(token, req, res);
                resolve(token);
            }
        });
    });
};
const jwtTokenCreate = (payload) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, SECRET_AUTH, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(token);
            }
        });
    });
};
const jwtverify = (token) => {
    // this verify the token
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, SECRET_AUTH, (err, decoded) => {
            if (err) {
                reject(false);
            }
            else {
                decoded.token = token;
                resolve(decoded);
            }
        });
    });
};
// const IsPageLogged = (ctx)=>{
//     return new Promise((resolve, reject)=>{
//         let {token }= cookie.parse(ctx.req.headers.cookie);
//         jwtverify(token).then(result =>{resolve(result)}).catch(err =>{reject(err)});
//     })
// }
const validateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // this is middle were to validate user cretanay=tials
    // return false if not logged in 
    let cookies = new cookies_1.default(req, res);
    let token = cookies.get("token");
    if (token === undefined) {
        throw new Error().message = "Invalid Login";
    }
    else {
        req.body.pemrAuth = yield jwtverify(token).then(result => result);
    }
    next();
});
const setJwtTokenCookie = (token, req, res) => {
    let cookies = new cookies_1.default(req, res);
    cookies.set("token", token, {
        httpOnly: true,
        sameSite: true
    });
};
module.exports = { jwtSign, jwtverify, validateUser, jwtTokenCreate };
//# sourceMappingURL=jwt.js.map