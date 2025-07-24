"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import useQuiz from "@/app/services/useQuiz";
export default function QuizPage({ params }: { params: { quizName: string } }) {
  const { data: session } = useSession();
  const { Quiz, isLoading, isError } = useQuiz({
    url: "get-myquiz",
    singleQuiz: true,
  });
  const user = session?.user.username;
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [start, setState] = useState<boolean>(false);
  useEffect(() => {
    if (user) {
      setUsername(user);
    }
    console.log(session);
  }, [session]);
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
            type="button"
            onSubmit={() => {
              if (username.trim())
                router.push(
                  `/quiz/${params.quizName}/question/1?username=${username}`
                );
              else return;
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
