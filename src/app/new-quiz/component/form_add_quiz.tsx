'use client';
import { useState,useEffect,useRef } from "react"
// import {useQuizStore} from "../store/QuizStore"
import type { FormEvent } from "react";
export default function FormAddQuiz(){
//     const {
//     quizzes,
//     addQuiz,
//     updateTitle,
//     updateQuestion,
//     toggleAnswer,addQuestion,removeQuestion,removeQuiz
//   } = useQuizStore();
    const handleSubmit=async(e:FormEvent)=>{e.preventDefault()}
    return <div onSubmit={handleSubmit}>
        {/* {quizzes.map((item,index)=><div></div>)} */}
    </div>
}