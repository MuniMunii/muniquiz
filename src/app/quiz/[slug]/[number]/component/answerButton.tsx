'use client'
import React, { SetStateAction, useEffect, useState } from "react";
import { AnswerChoiceType, QuestionType } from "../../../../../../lib/validation/quiz";
interface ButtonProps{
items:QuestionType[]
selectedItem:number
setIsDone:React.Dispatch<SetStateAction<boolean>>
setSlide:(newDirection:number)=>void
barTrigger:boolean
}
export default function AnswerButton({items,selectedItem,setIsDone,setSlide,barTrigger}:ButtonProps){
      //   State UI Effect for wrong answer
      const [isWrong, setIsWrong] = useState<boolean>(false);
      const THREE_SECOND=3000
      useEffect(() => {
        const timer = setTimeout(() => setIsWrong(false), THREE_SECOND);
        return () => clearTimeout(timer);
      }, [isWrong]);
            function handleFunctionButton({
      val,
      index,
    }: {
      val: AnswerChoiceType;
      index: number;
    }) {
  //       const isLastChoice = index === items[selectedItem].question.length - 1;
  const isLastQuestion = selectedItem === items.length - 1;
      if (isLastQuestion) {
        setIsDone(true);
      } else {
        if (val.answer === false) setIsWrong(true);
        else {
          setIsWrong(false);
          
        }
        setSlide(1);
      }
    }
    return items[selectedItem].question.map((val, i) => {
      return (
        <button
        disabled={barTrigger}
          key={`${val.question_id}-button`}
          onClick={() => {handleFunctionButton({ val, index: i });console.log('touched :',val.question)}}
          className={`w-full flex item-center justify-center h-fit bg-blue-400 ${
            isWrong && !val.answer ? "bg-red-600" : ""
          }`}
        >
          {val.question}
        </button>
      );
    });
}