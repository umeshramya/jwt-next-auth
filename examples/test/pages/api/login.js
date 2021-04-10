// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {jwtSign} from "jwt-next-auth"

const route = async(req, res) => {
  try {
    let result = await jwtSign(req.body, req , res).then(res=>res);
    console.log(req.body)
    res.status(200).json({mes : result})
  } catch (error) {
    res.status(500).send(error)
  }
}





export default route;
