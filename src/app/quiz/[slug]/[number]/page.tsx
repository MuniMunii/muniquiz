'use client'
import {useQuiz,sendRequestQuiz} from "@/app/services/useQuiz"
import useSWRMutation from 'swr/mutation'
import React, { useEffect,useState } from "react";
import { OwnerQuizType } from "../../../../../lib/validation/quiz";
import { AnimatePresence } from "framer-motion";
import SlideQuiz from "./component/slide";
interface MutationProps{
    message:string;
    data:OwnerQuizType
}
export default function QuestionPage({params}:{params:Promise<{slug:string,number:string}>}){
    const [Quiz,setQuiz]=useState<OwnerQuizType|undefined>()
const {number,slug}=React.use(params)
const enterID=slug
const questionIndex=Number(number)-1
const {trigger,error,isMutating}=useSWRMutation<MutationProps,Error,string,{enterID:string}>('get-quizparam',sendRequestQuiz)
useEffect(() => {
    trigger({ enterID:enterID }).then((res)=>setQuiz(res.data));
  }, [enterID, trigger]);
  useEffect(()=>{console.log(Quiz)},[Quiz])
// useEffect(()=>{console.log(isMutating)},[isMutating])
// Fallback
// if (error) return <div>Error loading quiz</div>;
//   if (isMutating) return <div>Loading...</div>;
// if (!currentQuiz) return <div>Invalid quiz index</div>;
// Main Component
    return (
        <div className="text-white w-full h-full min-h-screen flex flex-col bg-purple-500">
            <div className="w-full h-fit bg-slate-800 flex justify-between px-6 py-4 items-center">
                <p>{Quiz?.titleQuiz}</p>
                <p className="bg-slate-300 p-2 rounded-md text-black font-semibold">{Quiz?.timer===0?'No Timer':Quiz?.timer}</p>
            </div>
            <SlideQuiz key={'slideQuiz'} question={Quiz?.Quiz} isLoading={isMutating}/>
        </div>
    )
}