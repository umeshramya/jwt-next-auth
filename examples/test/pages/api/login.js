
import { jwtSign } from "jwt-next-auth"

const route = async (req, res) => {
  try {
    let payload = req.body;
    console.log(payload)
    //write code check from data base usernam and pasword
    // then add role property for the payload most ofetn dervied from database
    payload.role = "admin"// real world application this comes from database of users
    let result = await jwtSign(payload, req, res).then(res => res);
    console.log(process.env.NODE_ENV === "development")

    res.status(200).json({ mes: result })
  } catch (error) {
    res.status(500).send(error)
  }
}





export default route;
