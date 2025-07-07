'use client'
import { signOut } from "next-auth/react"
export default function SignoutButton({session}:{session:boolean}){
    return session&&<button onClick={()=>{signOut()}}>Sign out</button>
}