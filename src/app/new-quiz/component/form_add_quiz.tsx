"use client";
import { useEffect, useState } from "react";
import { useQuizStore } from "../store/QuizStore";
import type { FormEvent } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Modal from "@/app/component/modal";
import useBlockNavigation from "@/app/hook/useBlockNavigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ConfirmationModal from "@/app/component/confirmationModal";
import { useRouter } from "next/navigation";
// type for label categoty
type CategoryProps = "math" | "biology" | "bussiness" | "tech" | "other";
interface CategoryData {
  label: CategoryProps;
  image: string;
}
// Record for providing default image/icon and label
const categoryRecord: Record<CategoryProps, CategoryData> = {
  math: {
    label: "math",
    image:
      "https://res.cloudinary.com/duyurqj38/image/upload/v1752747793/math_b38wzt.png",
  },
  biology: {
    label: "biology",
    image:
      "https://res.cloudinary.com/duyurqj38/image/upload/v1752747651/biology_tp0avi.png",
  },
  bussiness: {
    label: "bussiness",
    image:
      "https://res.cloudinary.com/duyurqj38/image/upload/v1752747715/bussiness_yipntx.png",
  },
  tech: {
    label: "tech",
    image:
      "https://res.cloudinary.com/duyurqj38/image/upload/v1752747501/tech-icon_sndebg.png",
  },
  other: {
    label: "other",
    image:
      "https://res.cloudinary.com/duyurqj38/image/upload/v1752747872/other_vkbvs0.png",
  },
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AddQuiz({ user }: any) {
  const [quizName, setQuizName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [Success, setSuccess] = useState<boolean>(false);
  const [SuccessMsg, setSuccessMsg] = useState<string>("");
  const [listError, setListError] = useState<IssuesProps[]>([]);
  const [category, setCategory] = useState<CategoryProps>("other");
  const [timer, setTimer] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
    const [navigate, setNavigate] = useState<boolean>(false);
const { isAttemptingNavigation, cancelNavigation,bypassNavigation,proceedNavigation} = useBlockNavigation(true, ["/new-quiz"]);
    // useEffect(()=>{
    //   if(navigate){;console.log('nav fired');setNavigate(false)};
    // },[navigate])
  const {
    quizzes,
    addQuiz,
    updateTitle,
    updateQuestion,
    toggleAnswer,
    addAnswerChoice,
    removeQuestion,
    removeQuiz,
    resetQuiz
  } = useQuizStore();
  // function post adding quiz
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Checking Empty answer choice
    const hasEmptyQuestion = quizzes.some((quiz) =>
      quiz.question.some((questionI) => questionI.question === "")
    );
    const hasEmptyAnswer= quizzes.some((quiz) =>
      quiz.question.filter((questionI) => questionI.real_answer).length!==1
    );
    if (hasEmptyQuestion||hasEmptyAnswer) {
      setError(true);
      setErrorMsg("There is an empty Answer Choice");
      return;
    }
    const ReconstructData = {
      titleQuiz: quizName,
      Quiz: quizzes,
      category: categoryRecord[category].label,
      timer: timer,
      image: categoryRecord[category].image,
    };
    try {
      setIsLoading(true);
      const request = await fetch("/api/quiz/add-quiz", {
        method: "POST",
        body: JSON.stringify(ReconstructData),
        headers: { "Content-Type": "application/json" },
      });
      const data: StatusResponsePost = await request.json();
      // Errors Fallback
      if (data.errors) {
        setError(data.status);
        setErrorMsg(data.message);
        data.errors.issues.splice(0, 2).forEach((err) => {
          setListError([{ path: err.path[0], message: err.message }]);
        });
        // Success fetch
      } else {
        setSuccess(data.status);
        setSuccessMsg("Quiz Succesfully added");
        resetQuiz()
        setQuizName("")
      setTimeout(()=>{bypassNavigation(`/dashboard/${user.username}`);console.log('nav fired')},3000)
      }
    } catch {
      setErrorMsg("Error, Try Again");
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  // cleanup state
  useEffect(() => {
    if (!error && !Success) return;
    const timer = setTimeout(() => {
      setError(false);
      setErrorMsg("");
      setListError([]);
      setSuccess(false);
    }, 4050);
    return () => clearTimeout(timer);
  }, [error, Success]);
  useEffect(()=>console.log(quizzes),[quizzes])
  return (
    <>
    <ConfirmationModal href={`/dashboard/${user.username}`} proceedNavigation={proceedNavigation} isAttemptingNavigation={isAttemptingNavigation} bypassNavigation={bypassNavigation} ConfirmationText="Are you sure want to leave?, the form will be destroyed" cancelNavigation={cancelNavigation}/>
      <Modal
        messages={errorMsg || SuccessMsg}
        show={error || Success}
        success={Success}
        list={listError ?? null}
      />
      <div className="max-w-[1200px] w-[90%] mx-auto min-h-40 h-fit p-6 bg-[#FFFFF0] rounded-md text-black flex flex-col gap-5 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <input
          placeholder="QUIZ NAME?"
          value={quizName}
          onChange={(e) => {
            setQuizName(e.currentTarget.value);
            e.preventDefault();
          }}
          className="border-gray-300 border w-full text-center text-2xl p-4 outline-none bg-gray-200 rounded-2xl"
        />
        <div className="w-full flex-wrap flex items-center justify-center gap-6">
          <div className="w-full max-w-[600px] h-80 bg-yellow-100 text-neutral-800 rounded-md p-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <h2 className={`text-center text-3xl uppercase`}>Instruction</h2>
            <ul className="flex flex-col gap-3">
              <li>Need at least 3 Question</li>
              <li className="flex flex-row-reverse w-fit gap-2 items-center">
                This button for deleting answer choice
                <button type="button" className="bg-red-500 size-8">
                  X
                </button>
              </li>
              <li className="flex flex-row-reverse w-fit gap-2 items-center">
                This button for deleting question
                <button
                  type="button"
                  className="border border-blue-600 py-2 px-4"
                >
                  Delete Quiz
                </button>
              </li>
              <li>Please fill all text input before submiting the Quiz</li>
            </ul>
          </div>
          <div className="w-full h-80 max-w-[400px] flex flex-col gap-3 p-4 bg-blue-300 rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <div className="flex gap-2 items-center">
              <h2>Set Category</h2>
              <Select
                disabled={error || Success}
                onValueChange={(val) => {
                  setCategory(val as CategoryProps);
                }}
              >
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Set Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="math">Math</SelectItem>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="bussiness">Bussiness</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 items-center">
              <h2>Set Timer</h2>
              <Select
                disabled={error || Success}
                onValueChange={(val) => setTimer(Number(val))}
              >
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Set Timer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Timer</SelectLabel>
                    <SelectItem value="0">No Timer</SelectItem>
                    <SelectItem value="30">30 Minutes</SelectItem>
                    <SelectItem value="60">1 Hour</SelectItem>
                    <SelectItem value="90">1 Hour 30 Minutes</SelectItem>
                    <SelectItem value="120">2 Hours</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="border-t border-t-gray-400 flex flex-col gap-3">
              <p>
                Timer: {timer === 0 && "No Timer"}
                {timer === 30 && "30 Minute"}
                {timer === 60 && "1 Hour"}
                {timer === 90 && "1 Hour 30 Minutes"}
                {timer === 120 && "2 Hours"}
              </p>
              <p>
                Category:{" "}
                {String(category).charAt(0).toUpperCase() +
                  String(category).slice(1)}
              </p>
            </div>
          </div>
        </div>
        {quizzes.map((itemQuiz, indexQuiz) => {
          const selectedAnswerIndex = itemQuiz.question.findIndex(
            (q) => q.real_answer
          );
          return (
            <div key={itemQuiz.id} className="w-full h-fit flex-col">
              <div className="flex w-fit gap-2 mb-3">
                <input
                  className="border border-amber-300"
                  value={itemQuiz.title}
                  placeholder="Question Title"
                  onChange={(e) =>
                    updateTitle(indexQuiz, e.currentTarget.value)
                  }
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
                onValueChange={(value) =>
                  toggleAnswer(indexQuiz, Number(value))
                }
              >
                {itemQuiz.question.map((itemQuestion, indexQuestion) => (
                  <div key={itemQuestion.question_id} className="flex gap-3">
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
                        placeholder="Answer Choice"
                        onChange={(e) =>
                          updateQuestion(
                            indexQuiz,
                            indexQuestion,
                            e.currentTarget.value
                          )
                        }
                        className="border-gray-300 focus:border-blue-400 border pl-2 p-3 rounded-xl outline-none"
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
                onClick={() => addAnswerChoice(indexQuiz)}
              >
                Add Answer Choice
              </button>
            </div>
          );
        })}
        <button
          disabled={Success}
          className="cursor-pointer border-green-500 border"
          onClick={() => {
            addQuiz();
          }}
        >
          Add Quiz
        </button>
        <button
          disabled={Success || isLoading}
          className="cursor-pointer border-green-600 border"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </>
  );
}
