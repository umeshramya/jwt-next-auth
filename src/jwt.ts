// this is file contains jwt token functions

import jwt from "jsonwebtoken"
import Cookies from "cookies"
import {NextApiResponse, NextApiRequest, NextApiHandler, NextPageContext} from 'next'


const Secret_Auth = process.env.SECRET_AUTH || "ramya darling"


/**
 * This is function for signing in the user and setting up the cookie of jwt using environemntal variable SECRET_AUTH
 * @param payload this is payload that has to given for creating json web token it will contain values to be utlized in subsequent request
 * @param req This is req from NextApiRequest
 * @param res This is the response of NextApiResponse
 * @returns This return the new promise which has to resolved thus it seting  the server side cookie with key token and value jsowebtoken. further it return the jsonwebtoken as string.
 */
const jwtSign = (payload:{},req:NextApiRequest, res:NextApiResponse)=>{
    // this fun is for only creating login jwt 
    
        return new Promise((resolve, reject)=>{
            jwt.sign(payload, Secret_Auth, { expiresIn: '1d' }, (err, token)=>{
                if(err){
                    reject(err)
                }else if (token === undefined){
                    reject("token is undefined")
                }else{
                    setJwtTokenCookie(token ,req, res);
                    resolve(token)
                }
            });
            
        })
   



}

/**
 * Helper function for creating jsonweb token usin AUTH_SECRET environmental variable
 * This can be used to create new json token from client application apart sign in token
 * @param payload payload is object for creation of jsonwebtoken
 * @returns returns a promise with resolveble jsonwebtoken 
 */
const jwtTokenCreate = (payload:{})=>{
    return new Promise((resolve, reject)=>{
        jwt.sign(payload, Secret_Auth, { expiresIn: '1d' }, (err, token)=>{
            if(err){
                reject(err)
            }else if (token === undefined){
                reject("token is undefined")
            }else{
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
const jwtverify = (token:string) =>{
    // this verify the token
    return new Promise((resolve, reject)=>{
        jwt.verify(token, Secret_Auth, (err, decoded:any)=>{
            if(err){
                reject(false)
            }else if(decoded === undefined){
                reject('invalid token')
            }else{
                decoded.token = token
                resolve(decoded)
            }
        })
    })
}

/**
 * This is funtion which has to be exucuted in getServerSideProps or getStaticProps
 * @param req NextApiRequest
 * @param res NextApiResponse
 * @nextResolve This is function to be called on promise  resolve
 * @nextREject this is the function to be called on rjection of promise
 * @returns new Promise :- it resolves if the sign in token (cookie is valid and present) else it rejects
 */
const IsPageLogged = (req:NextApiRequest, res:NextApiResponse, nextResolve=()=>true, nextReject=()=>false)=>{
     
    return new Promise((resolve, reject)=>{
        let cookies = new Cookies(req, res)
        let token = cookies.get("token")
        if(token === undefined){
            reject(nextReject())
        }else{
            jwtverify(token)
            .then(result =>nextResolve())
            .catch(err =>{reject(nextReject())});
        }
        
            
    })
}


/**
 * This forvaldating user
 * @param req NextApiRequest
 * @param res NextApiResponse
 * @param next next function called 
 */
const validateUser = async(req:NextApiRequest, res:NextApiResponse, next?:Function)=>{
    // this is middle were to validate user cretanay=tials
    // return false if not logged in 
  
        let cookies = new Cookies(req, res);
        let token = cookies.get("token");
        if(token === undefined){
            throw new Error().message="Invalid Login";
        }else{
           req.body.pemrAuth = await jwtverify(token).then(result => result)

        }
        if(next !== undefined){
            next();
        }
        

    
}

/**
 * Helper function for setting cookie
 * @param token This the content of cookie with key of token
 * @param req NextApiRequest
 * @param res NextApiResponse
 */
const setJwtTokenCookie = (token:string, req:NextApiRequest, res:NextApiResponse)=>{
    let cookies = new Cookies(req, res);
    cookies.set("token", token, {
        httpOnly : true,
        sameSite : true
    })
    
}

export  {jwtSign, jwtverify, IsPageLogged, validateUser, jwtTokenCreate}
