// this is file contains jwt token functions

import jwt from "jsonwebtoken"
import Cookies from "cookies"
import {NextApiResponse, NextApiRequest} from "next"


const SECRET_AUTH = process.env.SECRET_AUTH || "ramya darling"

const jwtSign = (payload:{}, res:NextApiResponse)=>{
    // this fun is for only creating login jwt 
    
        return new Promise((resolve, reject)=>{
            jwt.sign(payload, SECRET_AUTH, { expiresIn: '1d' }, (err, token)=>{
                if(err){
                    reject(err)
                }else{
                    setJwtTokenCookie(token, res);
                    resolve(token)
                }
            });
            
        })
   



}


const jwtTokenCreate = (payload:{})=>{
    return new Promise((resolve, reject)=>{
        jwt.sign(payload, SECRET_AUTH, { expiresIn: '1d' }, (err, token)=>{
            if(err){
                reject(err)
            }else{
     
                resolve(token)
            }
        });
        
    })




}

const jwtverify = (token:string) =>{
    // this verify the token
    return new Promise((resolve, reject)=>{
        jwt.verify(token, SECRET_AUTH, (err, decoded)=>{
            if(err){
                reject(false)
            }else{
                decoded.token = token
                resolve(decoded)
            }
        })
    })
}


const IsPageLogged = (ctx)=>{
    return new Promise((resolve, reject)=>{
        let {token }= cookie.parse(ctx.req.headers.cookie);
        jwtverify(token).then(result =>{resolve(result)}).catch(err =>{reject(err)});
 
            
    })
}



const validateUser = async(req, res, next)=>{
    // this is middle were to validate user cretanay=tials
    // return false if not logged in 
    try {
        let {token }= cookie.parse(req.headers.cookie);
       const result =  await jwtverify(token).then(result => result)

       req.pemrAuth = result
        next();
    } catch (error) {
        console.log(error)
        res.sttus(500).send(error)
    }
    
}


const setJwtTokenCookie = (token, res)=>{
     res.cookie("token", token ,{
        httpOnly : true,
        sameSite : true
     });
    
}

module.exports = {jwtSign, jwtverify, IsPageLogged, validateUser, jwtTokenCreate}
