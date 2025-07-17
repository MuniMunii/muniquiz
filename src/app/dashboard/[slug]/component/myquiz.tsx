"use client";
import { useState, useEffect, CSSProperties } from "react";
import { OwnerQuizType } from "../../../../../lib/validation/quiz";
import { GetMyQuiz } from "@/app/services/QuizService";
export default function MyQuiz() {
  const [myQuiz, setMyQuiz] = useState<OwnerQuizType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<ErrorProps>({
    message: "",
    error: false,
  });
  useEffect(() => {
    GetMyQuiz().then((data) => {
      setMyQuiz(data);
    }).catch(()=>{setIsLoading(false);setIsError({message:'Error Try Again',error:true})}).finally(()=>setIsLoading(false));
  }, []);
  return myQuiz.map((item, index) => {
    const stripedBG: CSSProperties = {
      backgroundImage:
        "repeating-linear-gradient(45deg, #e1e1e1 0, #e1e1e1 1px, transparent 0, transparent 50%)",
      backgroundSize: "10px 10px",
      backgroundAttachment: "fixed",
    };
    return (
      <div
        key={item.enterID}
        style={stripedBG}
        className="w-48 h-52 bg-amber-50 flex flex-col justify-between rounded-md overflow-hidden"
      >
        <div className="w-full h-20 text-black">icon</div>
        <div className="w-full h-28 bg-white"></div>
      </div>
    );
  });
}
