
import {jwtTokenCreate, jwtverify} from "jwt-next-auth"
import { result } from "lodash";
import cookie from "cookie"

const route = async(req, res)=>{
    try {

        let payload = req.body;
        payload.role = "admin"// real world application this comes from database of users

         let token = await jwtTokenCreate(payload).then(r=>r)
         res.setHeader('Set-Cookie', cookie.serialize('token', token, {
             "httpOnly" : true,
             "sameSite" : true,
             secure: process.env.NODE_ENV === "development" ? false : true
         }))
         res.status(200).json({mes:token})
    } catch (error) {
        res.status(500).send(error)
    }
}


export default route;

