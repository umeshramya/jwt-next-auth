import React from 'react'
import {ButtonP} from "reactstrap-react-lib"
import axios from "axios"

function Logout() {
   const  logout =async()=>{
        try {
          let res=  await axios.get("/api/logout").then(res=>res)
            alert(res.data.mes)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
        <h3>Logout</h3>
        <ButtonP
            text="Log out"
            onClick={logout}
        />
        </>
    )
}

export default Logout
