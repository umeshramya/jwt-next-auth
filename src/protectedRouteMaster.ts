// this file createws the xclosure for protected route

import { validateUser } from "./jwt";
import { NextApiRequest, NextApiResponse } from "next";
// import { pemrTypes } from "../models"
import _ from "lodash";

/**
 * This is closure for route function
 * @<Body> is type oi req body that is sent
 * @<return> is type of return the inner function gives
 * @param route This route function in api directory of page
 * @param permitedRoles arraay role who have access for this route
 * @authVerify : this is callback function accepts the auth object as argument (auth is the one which you put in JWT payload this is optional)
 * @returns route function which is used in api of next
 */
const protectedRouteMaster = (route: Function, permitedRoles?: string[], authVerify?:(auth:{}, req?:NextApiRequest, res?:NextApiResponse )=>Promise<boolean>) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (process.env.LOG_REQUEST == "true") {
      console.log("headers", JSON.stringify(req.headers));
      console.log("body", JSON.stringify(req.body));
    }
    let statusCode = 500;
    try {
      await validateUser(req, res).then((r) => r);
      let body = _.omit(req.body, "pemrAuth");

      let auth = _.pick(req.body, "pemrAuth").pemrAuth;
      if (process.env.LOG_REQUEST == "true") {
        console.log("auth",JSON.stringify(auth));
      }
      if(authVerify){
        const verified:boolean = await authVerify(auth, req, res)
        if(!verified){
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
      let routeReturn = await route(req, res, body, auth);
    } catch (error) {
      res.status(statusCode).send(error);
    }
  };
};

export default protectedRouteMaster;
