//this is protected route

import { protectedRouteMaster} from "jwt-next-auth"


const route = async(req, res, body, auth) => {
    try {
        console.log("body", body)//access body requet
        console.log("auth", auth)//access auth body from here
        res.status(200).json({mes:"varied user"})
        
    } catch (error) {
        res.status(500).send(error)
    }
}



export default protectedRouteMaster(route, ["admin", "editor"])