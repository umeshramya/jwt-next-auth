import {jwtTokenCreate} from "jwt-next-auth"

const route = async(req, res)=>{
    try {
         let token = await jwtTokenCreate(req.body).then(r=>r)
         res.status(200).json({mes:token})
    } catch (error) {
        res.status(500).send(error)
    }
}


export default route;