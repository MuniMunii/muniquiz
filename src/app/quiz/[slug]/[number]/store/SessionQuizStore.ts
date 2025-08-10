import { create } from "zustand"
import { ProgressQuizType } from "../../../../../../lib/validation/participate"
import { immer } from "zustand/middleware/immer";
interface SessionQuizProps{
    answerState:ProgressQuizType[]
    addAnswer:(newAnswer:ProgressQuizType)=>void
}
export const SessionQuizStore=create<SessionQuizProps>()(
    immer((set)=>({
        answerState:[],
        addAnswer(newAnswer) {
            set((state)=>{state.answerState.push(newAnswer)})
        },
    }))
)