
import { OwnerQuizType } from "../../../lib/validation/quiz";
export async function GetMyQuiz():Promise<OwnerQuizType[]> {
    const response=await fetch('/api/quiz/get-myquiz',{method:'GET',headers:{'Content-Type':'application/json'}})
  if (!response.ok) throw new Error("Failed to fetch quizzes");
   const data = await response.json();
  return data.data as OwnerQuizType[];
}
