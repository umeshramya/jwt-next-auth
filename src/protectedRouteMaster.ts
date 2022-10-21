// this file createws the xclosure for protected route

import {validateUser} from "./jwt"
import { NextApiRequest, NextApiResponse } from "next"
// import { pemrTypes } from "../models"
import _ from "lodash"


/**
 * This is closure for route function
 * @<Body> is type oi req body that is sent
 * @<return> is type of return the inner function gives
 * @param route This route function in api directory of page
 * @param permitedRoles arraay role who have access for this route
 * @returns route function which is used in api of next
 */
const protectedRouteMaster = (route:Function, permitedRoles?:string[])=>{

    return async (req:NextApiRequest, res:NextApiResponse)=>{
        if(process.env.LOG_REQUEST == "true"){
            console.log(req)
           }

            let statusCode = 500;
        try {
            await validateUser(req, res).then(r=>r);
            let body= _.omit(req.body, "pemrAuth");
            
            let auth = _.pick(req.body, "pemrAuth").pemrAuth
         

            if(permitedRoles !== undefined){
                if(permitedRoles.indexOf(auth.role) < 0){
                   statusCode=403;
                   throw new Error().message="Forbidden"
                }
            }
            let routeReturn=  await route(req, res, body, auth)
            
        } catch (error) {
 
            res.status(statusCode).send(error)
        }
    }
}

export default protectedRouteMaster;

