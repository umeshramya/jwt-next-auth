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
exports.checkRoles = exports.logout = exports.jwtTokenCreate = exports.validateUser = exports.IsPageLogged = exports.jwtverify = exports.jwtSign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookies_1 = __importDefault(require("cookies"));
const Secret_Auth = process.env.SECRET_AUTH || "ramya darling";
/**
 * This is function for signing in the user and setting up the cookie of jwt using environemntal variable SECRET_AUTH
 * @param payload this is payload that has to given for creating json web token it will contain values to be utlized in subsequent request
 * @param req This is req from NextApiRequest
 * @param res This is the response of NextApiResponse
 * @returns This return the new promise which has to resolved thus it seting  the server side cookie with key token and value jsowebtoken. further it return the jsonwebtoken as string.
 */
const jwtSign = (payload, req, res) => {
    // this fun is for only creating login jwt 
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, Secret_Auth, { expiresIn: '1d' }, (err, token) => {
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
exports.jwtSign = jwtSign;
/**
 * Helper function for creating jsonweb token usin AUTH_SECRET environmental variable
 * This can be used to create new json token from client application apart sign in token
 * @param payload payload is object for creation of jsonwebtoken
 * @validateDays Number of days token is valid
 * @returns returns a promise with resolveble jsonwebtoken
 */
const jwtTokenCreate = (payload, validateDays = 1) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, Secret_Auth, { expiresIn: `${validateDays}d` }, (err, token) => {
            if (err) {
                reject(err);
            }
            else if (token === undefined) {
                reject("token is undefined");
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.jwtTokenCreate = jwtTokenCreate;
/**
 * Helper function for  jwtiverfy
 * @param token jsonwebtoen to be  veriied using SECRET_AUTH environmental variaable
 * @returns returns new promise with resolvable decoded.token
 */
const jwtverify = (token) => {
    // this verify the token
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, Secret_Auth, (err, decoded) => {
            if (err) {
                reject(false);
            }
            else if (decoded === undefined) {
                reject('invalid token');
            }
            else {
                decoded.token = token;
                resolve(decoded);
            }
        });
    });
};
exports.jwtverify = jwtverify;
/**
 * This is funtion which has to be exucuted in getServerSideProps or getStaticProps
 * @param req NextApiRequest
 * @param res NextApiResponse
 * @param validateSessionByUuid:Function check session function return true or false
 * @returns new Promise :- it resolves if the sign in token (cookie is valid and present) else it rejects
 */
const IsPageLogged = (req, res, validateSessionByUuid) => __awaiter(void 0, void 0, void 0, function* () {
    let cookies = new cookies_1.default(req, res);
    let token = cookies.get("token");
    let auth;
    if (token === undefined) {
        auth = false;
    }
    else {
        auth = yield jwtverify(token);
    }
    if (validateSessionByUuid) {
        if (auth != false) {
            const validateSession = yield validateSessionByUuid(auth, req, res);
            if (!validateSession) {
                auth = false;
            }
        }
    }
    return new Promise((resolve, reject) => {
        if (auth) {
            resolve(auth);
        }
        else {
            reject("Undefined Token");
        }
    });
});
exports.IsPageLogged = IsPageLogged;
// /**
//  * This is funtion which has to be exucuted in getServerSideProps or getStaticProps
//  * @param req NextApiRequest
//  * @param res NextApiResponse
//  * @returns new Promise :- it resolves if the sign in token (cookie is valid and present) else it rejects
//  */
// const IsPageLogged = (req: NextApiRequest, res: NextApiResponse) => {
//     return new Promise((resolve, reject) => {
//         let cookies = new Cookies(req, res)
//         let token = cookies.get("token")
//         if (token === undefined) {
//             reject("Undefined Token")
//         } else {
//             jwtverify(token)
//                 .then(result => resolve(result))
//                 .catch(err => { reject(err) });
//         }
//     })
// }
/**
 * check the the perrmited role
 * @param currentRole  current role
 * @param rolesarray array of permitted roles
 * @returns boolean
 */
const checkRoles = (currentRole, roles) => {
    if (roles.indexOf(currentRole) < 0) {
        return false;
    }
    else {
        return true;
    }
};
exports.checkRoles = checkRoles;
/**
 * This forvaldating user
 * @param req NextApiRequest
 * @param res NextApiResponse
 * @param next next function called
 */
const validateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.validateUser = validateUser;
/**
 * Helper function for setting cookie
 * @param token This the content of cookie with key of token
 * @param req NextApiRequest
 * @param res NextApiResponse
 */
const setJwtTokenCookie = (token, req, res) => {
    let cookies = new cookies_1.default(req, res);
    cookies.set("token", token, {
        httpOnly: true,
        sameSite: true,
        // secure: process.env.NODE_ENV === "development" ? false : true
    });
};
/**
 * Thi s ;logout by seting token value to ""
 * @param req NextApiRequest
 * @param res NextApiResponse
 */
const logout = (req, res) => {
    let cookies = new cookies_1.default(req, res);
    cookies.set("token", "");
};
exports.logout = logout;
//# sourceMappingURL=jwt.js.map