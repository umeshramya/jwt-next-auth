// this is file contains jwt token functions

import jwt from "jsonwebtoken"
import Cookies from "cookies"
import { NextApiResponse, NextApiRequest, NextApiHandler, NextPageContext } from 'next'
import crypto from "crypto";



const Secret_Auth = process.env.SECRET_AUTH || "ramya darling"


// Generate a random key and initialization vector (IV)
const algo = 'aes-256-cbc'
const key = process.env.JWT_ALGO_256_ENCRYPT_KEY || crypto.randomBytes(16).toString("hex")
const iv = process.env.JWT_ALGO_256_IV_KEY ||  crypto.randomBytes(8).toString("hex")


/**
 * Encrypts text using AES-256-CBC
 * @param {string} text - Text to encrypt
 * @returns {string} - Encrypted text in base64 format
 */
function encrypt(text:string): string {
    const cipher = crypto.createCipheriv(algo, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

/**
 * Decrypts text using AES-256-CBC
 * @param {string} encryptedText - Text to decrypt
 * @returns {string} - Decrypted text in utf-8 format
 */
function decrypt(encryptedText:string): string {
    const decipher = crypto.createDecipheriv(algo, key, iv);
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}



/**
 * This is function for signing in the user and setting up the cookie of jwt using environemntal variable SECRET_AUTH
 * @param payload this is payload that has to given for creating json web token it will contain values to be utlized in subsequent request
 * @param req This is req from NextApiRequest
 * @param res This is the response of NextApiResponse
 * @returns This return the new promise which has to resolved thus it seting  the server side cookie with key token and value jsowebtoken. further it return the jsonwebtoken as string.
 */
const jwtSign = (payload: {}, req: NextApiRequest, res: NextApiResponse) => {
    // this fun is for only creating login jwt 

    return new Promise((resolve, reject) => {
        jwt.sign(payload, Secret_Auth, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                reject(err)
            } else if (token === undefined) {
                reject("token is undefined")
            } else {
                setJwtTokenCookie(token, req, res);
                resolve(token)
            }
        });

    })




}

/**
 * Helper function for creating jsonweb token usin AUTH_SECRET environmental variable
 * This can be used to create new json token from client application apart sign in token
 * @param payload payload is object for creation of jsonwebtoken
 * @validateDays Number of days token is valid
 * @returns returns a promise with resolveble jsonwebtoken 
 */
const jwtTokenCreate = (payload: {}, validateDays: number = 1) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, Secret_Auth, { expiresIn: `${validateDays}d` }, (err, token) => {
            if (err) {
                reject(err)
            } else if (token === undefined) {
                reject("token is undefined")
            } else {
                resolve(token)
            }
        });

    })

}


/**
 * Helper function for  jwtiverfy
 * @param token jsonwebtoen to be  veriied using SECRET_AUTH environmental variaable
 * @returns returns new promise with resolvable decoded.token
 */
// const jwtverify = (token: string) => {
//     // this verify the token
//     return new Promise((resolve, reject) => {
//         jwt.verify(token, Secret_Auth, (err, decoded: any) => {
//             if (err) {
//                 reject(false)
//             } else if (decoded === undefined) {
//                 reject('invalid token')
//             } else {
//                 decoded.token = token
//                 resolve(decoded)
//             }
//         })
//     })
// }


const jwtverify = (encryptedToken: any) => {
    const token:any = decrypt(encryptedToken);
    return new Promise((resolve, reject) => {
        jwt.verify(token, Secret_Auth, (err: any, decoded: any) => {
            if (err) {
                reject(false);
            } else if (decoded === undefined) {
                reject('invalid token');
            } else {
                decoded.token = token;
                resolve(decoded);
            }
        });
    });
};



/**
 * This is funtion which has to be exucuted in getServerSideProps or getStaticProps
 * @param req NextApiRequest
 * @param res NextApiResponse
 * @param validateSessionByUuid:Function check session function return true or false
 * @returns new Promise :- it resolves if the sign in token (cookie is valid and present) else it rejects
 */
const IsPageLogged = async(req: NextApiRequest, res: NextApiResponse, validateSessionByUuid:Function) => {
    let cookies = new Cookies(req, res)
    let encryptedToken = cookies.get("token")
    let auth:any;
    if (encryptedToken === undefined) {
        auth = false
    }else{
        auth = await jwtverify(encryptedToken)
    }

if(validateSessionByUuid){
    if(auth != false){
        const validateSession = await validateSessionByUuid(auth, req, res)
        if(!validateSession){
            auth = false
        }
    } 
}  
    return new Promise((resolve, reject)=>{
        if(auth){
            resolve(auth)
        }else{
            reject("Undefined Token")
        }
    })
}




/**
 * check the the perrmited role
 * @param currentRole  current role 
 * @param rolesarray array of permitted roles
 * @returns boolean
 */
const checkRoles = (currentRole: string, roles: string[]): boolean => {
    if (roles.indexOf(currentRole) < 0) {
        return false
    } else {
        return true
    }
}


/**
 * This forvaldating user
 * @param req NextApiRequest
 * @param res NextApiResponse
 * @param next next function called 
 */
const validateUser = async (req: NextApiRequest, res: NextApiResponse) => {
    // this is middle were to validate user cretanay=tials
    // return false if not logged in 

    let cookies = new Cookies(req, res);
    let token = cookies.get("token");
    if (token === undefined) {
        throw new Error().message = "Invalid Login";
    } else {
        req.body.pemrAuth = await jwtverify(token).then(result => result)

    }




}

/**
 * Helper function for setting cookie
 * @param token This the content of cookie with key of token
 * @param req NextApiRequest
 * @param res NextApiResponse
 */
const setJwtTokenCookie = (token:string, req:NextApiRequest, res:NextApiResponse) => {
    const cookies = new Cookies(req, res);
    const encryptedToken = encrypt(token);
    cookies.set("token", encryptedToken, {
        httpOnly: true,
        sameSite: true,
        // secure: process.env.NODE_ENV === "production",
    });
};


/**
 * Thi s ;logout by seting token value to ""
 * @param req NextApiRequest
 * @param res NextApiResponse
 */
const logout = (req: NextApiRequest, res: NextApiResponse) => {
    let cookies = new Cookies(req, res);
    cookies.set("token", "");
}

export { jwtSign, jwtverify, IsPageLogged, validateUser, jwtTokenCreate, logout, checkRoles, encrypt, decrypt }
