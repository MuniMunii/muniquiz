'use client'
import { Button } from "@/components/ui/button"
import { faHourglass } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import { useState,useEffect } from "react"
import Modal from "./modal"
export default function JoinInput(){
    const [enterID,setEnterID]=useState<string>('')
    const [isError,setIsError]=useState<ErrorProps>({error:false,message:''})
    const router=useRouter()
    const searchQuizByenterID=async ()=>{
        try{
            const response=await fetch('/api/quiz/get-enterid',{method:'POST',body:JSON.stringify({enterID}),headers:{'Content-type':'application/json'}})
            const data=await response.json()
            if(!response.ok){
                setIsError({error:true,message:'Please Try Again'})
            }
            if(data.enterID){
            const enterIDFromFetch=data.enterID
            router.push(`/quiz/${enterIDFromFetch}`)
            }else{setIsError({error:true,message:data.message})}
        }catch(err){console.log('error',err)}
    }
    useEffect(()=>{const timer=setTimeout(()=>setIsError({error:false,message:''}),4000); return ()=>clearTimeout(timer) })
    return <>
    <Modal show={isError.error} messages={isError.message}/>
    <div className="flex flex-row items-center bg-slate-100 w-full max-w-[600px] p-3 gap-3 rounded-2xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <input value={enterID} onChange={(e)=>setEnterID(e.currentTarget.value)} type="text" className="h-16 w-full pl-4 border bg-white border-gray-400 outline-none rounded-xl" placeholder="Enter a join code"/>
          <Button onClick={()=>searchQuizByenterID()} className="bg-pink-400 hover:bg-pink-500 px-2 py-1 size-fit rounded-sm flex items-center gap-2"><FontAwesomeIcon icon={faHourglass}/>Search</Button>
          </div>
          </>
}