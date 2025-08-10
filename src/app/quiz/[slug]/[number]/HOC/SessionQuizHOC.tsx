import { sendRequestQuiz } from "@/app/services/useQuiz"
import useSWRMutation from "swr/dist/mutation"
import { OwnerQuizType } from "../../../../../../lib/validation/quiz";
interface MutationProps{
    message:string;
    data:OwnerQuizType
}
export default function SessionQuiz({children}:{children:React.ReactNode,timer:number}){
    // if(timer)
    const {trigger,error,isMutating}=useSWRMutation<MutationProps,Error,string,{enterID:string}>('get-quizSession',sendRequestQuiz)
    return (
        {children}
    )
}