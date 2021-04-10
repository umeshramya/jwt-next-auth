import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Login from "../components/Login"
import ProtectedRoute from "../components/ProtectedRoute"

export default function Home() {
  return (
   <>
   <Login />
   <ProtectedRoute/>
   </>
  )
}
