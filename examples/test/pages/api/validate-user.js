import {validateUser} from "jwt-next-auth"
const route = async(req, res)=>{
    try {
      await validateUser(req, res).then(r=>r)
        res.status(200).json({mes:JSON.stringify(req.body)})

    } catch (error) {
        res.status(500).send(error)
    }
}


export default route