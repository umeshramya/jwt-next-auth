
import {jwtTokenCreate, jwtverify} from "jwt-next-auth"
import { result } from "lodash";

const route = async(req, res)=>{
    try {

        let payload = req.body;
        payload.role = "admin"// real world application this comes from database of users

         let token = await jwtTokenCreate(payload).then(r=>r)
         res.status(200).json({mes:token})
    } catch (error) {
        res.status(500).send(error)
    }
}


export default route;

