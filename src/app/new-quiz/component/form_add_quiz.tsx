"use client";
import { useState, useEffect } from "react";
import { useQuizStore } from "../store/QuizStore";
import type { FormEvent } from "react";
import { v4 as uuid } from "uuid";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Modal from "@/app/component/modal";
export default function AddQuiz({ user }: any) {
  const [quizName, setQuizName] = useState<string>("");
  const [error,setError]=useState<boolean>(false)
  const [errorMsg,setErrorMsg]=useState<string>('')
  const {
    quizzes,
    addQuiz,
    updateTitle,
    updateQuestion,
    toggleAnswer,
    addQuestion,
    removeQuestion,
    removeQuiz,
  } = useQuizStore();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const ReconstructData = 
      {
        id: uuid(),
        enterID:uuid(),
        owner: user.username,
        created_At: new Date(),
        titleQuiz: quizName,
        Quiz: quizzes,
        participate:[]
      }
    console.log(ReconstructData)
    const request=await fetch('/api/quiz/add-quiz',{method:'POST',body:JSON.stringify(ReconstructData),headers:{'Content-Type':'application/json'}})
    const data=await request.json()
  };
  return (
    <>
    <Modal show={error} messages={errorMsg}/>
    <div className="max-w-[1200px] w-[90%] mx-auto min-h-40 h-fit p-6 bg-[#FFFFF0] rounded-md text-black flex flex-col gap-5">
      <input
        placeholder="QUIZ NAME?"
        value={quizName}
        onChange={(e) => setQuizName(e.currentTarget.value)}
        className="border-gray-300 border w-full text-center text-2xl p-4 outline-none bg-gray-200 rounded-2xl"
      />
      {quizzes.map((itemQuiz, indexQuiz) => {
        const selectedAnswerIndex = itemQuiz.question.findIndex(
          (q) => q.answer
        );
        return (
          <div key={itemQuiz.id} className="w-full h-fit flex-col">
            <div className="flex w-fit gap-2 mb-3">
              <input
                className="border border-amber-300"
                value={itemQuiz.title}
                onChange={(e) => updateTitle(indexQuiz, e.currentTarget.value)}
              />
              <button
                className="border border-blue-600 py-2 px-4 cursor-pointer"
                onClick={() => removeQuiz(indexQuiz)}
              >
                Delete Quiz
              </button>
            </div>
            <RadioGroup
              value={String(selectedAnswerIndex)}
              onValueChange={(value) => toggleAnswer(indexQuiz, Number(value))}
            >
              {itemQuiz.question.map((itemQuestion, indexQuestion) => (
                <div
                  key={itemQuestion.question_id}
                  className="flex gap-3 border border-amber-700"
                >
                  <Label
                    htmlFor={`quiz-${indexQuiz}-question-${indexQuestion}`}
                    className="flex gap-2 items-center cursor-pointer"
                  >
                    <RadioGroupItem
                      value={String(indexQuestion)}
                      id={`quiz-${indexQuiz}-question-${indexQuestion}`}
                    />
                    <input
                      value={itemQuestion.question}
                      onChange={(e) =>
                        updateQuestion(
                          indexQuiz,
                          indexQuestion,
                          e.currentTarget.value
                        )
                      }
                      className="border-pink-500 border"
                    />
                    <button
                      onClick={() => removeQuestion(indexQuiz, indexQuestion)}
                      className="bg-red-500 size-8"
                    >
                      X
                    </button>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <button
              className="cursor-pointer border border-green-600 mt-3"
              onClick={() => addQuestion(indexQuiz)}
            >
              Add Question
            </button>
          </div>
        );
      })}
      <button
        className="cursor-pointer border-green-500 border"
        onClick={() => {
          addQuiz();
        }}
      >
        Add Quiz
      </button>
      <button
        className="cursor-pointer border-green-600 border"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Submit
      </button>
    </div>
  </>);
}
