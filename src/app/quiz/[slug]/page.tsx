"use client";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {sendRequestQuiz } from "@/app/services/useQuiz";
import useSWRMutation from "swr/mutation";
import { OwnerQuizType } from "../../../../lib/validation/quiz";
// import useQuiz from "@/app/services/useQuiz";
export default function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { data: session } = useSession();
  const {slug}=use(params)
  const enterID=slug
  // const { Quiz, isLoading, isError } = useQuiz({
  //   url: "get-myquiz",
  //   singleQuiz: true,
  // });
  const user = session?.user.username;
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  // const [start, setState] = useState<boolean>(false);
  const start=false
  useEffect(() => {
    if (user) {
      setUsername(user);
    }
    console.log(session);
  }, [session]);
  const {trigger,isMutating}=useSWRMutation<OwnerQuizType,Error,string,{enterID:string}>('get-enterid',sendRequestQuiz)
  useEffect(() => {
  if (enterID) {
    console.log(enterID)
    trigger({ enterID }); 
  }
}, [enterID, trigger]);
  const handleClick=async()=>{
    try{
      console.log('test handle')
        console.log('test handle if')
              const result=await trigger({enterID:enterID})
              console.log(result)
              console.log(enterID)
            router.push(
                  `/quiz/${result.enterID}/1?username=${username}`
                );
              
    }catch(err){throw new Error(`fetching error:${err}`)}
  }
  if (!start) {
    return (
      <div className="size-full min-h-screen flex items-center justify-center">
        <div className="w-full max-w-[600px] h-64 bg-white flex flex-col item-center justify-center">
          <input
            disabled={typeof session?.user.username === "string"}
            placeholder="Input Username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            className="border border-gray-400 text-neutral-700"
          />
          <Button
          disabled={isMutating}
            type="button"
            onClick={() => {
              handleClick()
            }}
            className="border border-gray-800"
          >
            Start the quiz
          </Button>
        </div>
      </div>
    );
  }
  return <div></div>;
}
