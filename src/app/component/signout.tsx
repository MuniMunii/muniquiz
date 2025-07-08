'use client'
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
export default function SignoutButton(){
    return <Button variant={'outline'} className="text-black" onClick={()=>{signOut()}}>Sign out</Button>
}