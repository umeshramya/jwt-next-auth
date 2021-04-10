import {validateUser} from "jwt-next-auth"

const route = async(req, res) => {
    try {
        let isVerified = await validateUser(req, res).then(r=>r);
        console.log(req.body)
        res.status(200).json({mes:"varied user"})
        
    } catch (error) {
        res.status(500).send(error)
    }
}

export default route;