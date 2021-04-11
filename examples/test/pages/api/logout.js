import {logout} from "jwt-next-auth"
const route = (req, res)=>{
    try {
        logout(req, res)
        res.status(200).json({mes: "logged out"})
    } catch (error) {
        res.status(500).send(error)
    }
}


export default route