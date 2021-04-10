import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Login from "../components/Login"
import ValidateUser from "../components/ValidateUser"
import CreateToken from "../components/CreateToken"
import {IsPageLogged} from "jwt-next-auth"

export default function Home(props) {
  return (
   <>
   <h1>{props.pageLogged ? "Page is logged" : "Page is not logged"}</h1>
   <Login />
   <ValidateUser/>
   <CreateToken />
   </>
  )
}


export async function getServerSideProps(ctx) {
  try {

    const result = await IsPageLogged(ctx.req, ctx.res).then(result=>result)
    return {
      props: {pageLogged : true}, // will be passed to the page component as props
    }
  } catch (error) {
 
    return { props: {pageLogged : false} };
  }
 
}
