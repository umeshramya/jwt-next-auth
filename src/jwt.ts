// this is file contains jwt token functions

import jwt from "jsonwebtoken"
import Cookies from "cookies"
import {NextApiResponse, NextApiRequest, NextApiHandler, NextPageContext} from "next"


const SECRET_AUTH = process.env.SECRET_AUTH || "ramya darling"

const jwtSign = (payload:{},req:NextApiRequest, res:NextApiResponse)=>{
    // this fun is for only creating login jwt 
    
        return new Promise((resolve, reject)=>{
            jwt.sign(payload, SECRET_AUTH, { expiresIn: '1d' }, (err, token)=>{
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
        jwt.verify(token, SECRET_AUTH, (err, decoded:any)=>{
            if(err){
                reject(false)
            }else{
                decoded.token = token
                resolve(decoded)
            }
        })
    })
}


const IsPageLogged = (req:NextApiRequest, res:NextApiResponse)=>{
  
    return new Promise((resolve, reject)=>{
        let cookies = new Cookies(req, res)
        let token = cookies.get("token")
        if(token === undefined){
            reject("invalid login")
        }else{
            jwtverify(token)
            .then(result =>{resolve(result)})
            .catch(err =>{reject(err)});
        }
        
            
    })
}



const validateUser = async(req:NextApiRequest, res:NextApiResponse, next:Function)=>{
    // this is middle were to validate user cretanay=tials
    // return false if not logged in 
  
        let cookies = new Cookies(req, res);
        let token = cookies.get("token");
        if(token === undefined){
            throw new Error().message="Invalid Login";
        }else{
           req.body.pemrAuth = await jwtverify(token).then(result => result)

        }
     
        next();

    
}


const setJwtTokenCookie = (token:string, req:NextApiRequest, res:NextApiResponse)=>{
    let cookies = new Cookies(req, res);
    cookies.set("token", token, {
        httpOnly : true,
        sameSite : true
    })
    
}

export  {jwtSign, jwtverify, IsPageLogged, validateUser, jwtTokenCreate}
