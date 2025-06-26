'use client';
import Link from "next/link";
import { useEffect } from "react";
import { useSession,signOut } from "next-auth/react";
export default function Home() {
  useEffect(()=>{
    const fetchTest=async()=>{
      try{
        const response = await fetch("/api/test",{method:"get",headers: {
            'Content-Type': 'application/json',
          }})
        const data =await response.json()
        console.log(data) 
      }catch(error){console.log('cannot fetch data',error)}
    }
    fetchTest()
  },[])
  const {data:session,status}=useSession()
  useEffect(()=>{console.log(`is Login?: ${session}, status: ${status}`)},[session])
  return (
    <div className="size-full bg-amber-400 flex gap-4">
      <Link href={'/auth/signin'}>Sign In</Link>
      {session&&<button onClick={()=>{signOut()}}>Sign out</button>}
    </div>
  );
}
