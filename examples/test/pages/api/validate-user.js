import {validateUser} from "jwt-next-auth"
const route = async(req, res)=>{
    try {
        let result = await validateUser(req, res).then(r=>r)
        res.status(200).json({mes:result})

    } catch (error) {
        res.status(500).send(error)
    }
}