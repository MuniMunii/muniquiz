import type { OwnerQuizType } from "../../../lib/validation/quiz";
import useSWR from "swr";
export default function useQuiz<T extends boolean>({ url, singleQuiz }: { url: string, singleQuiz: T }) {
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data, error, isLoading } = useSWR(`/api/quiz/${url}`, fetcher, {
    revalidateIfStale: true
  });
  type QuizType = T extends true ? OwnerQuizType : OwnerQuizType[];
  const Quiz: QuizType = singleQuiz
    ? (data?.data as QuizType)
    : (Array.isArray(data?.data) ? data.data : []) as QuizType;
  return {
    Quiz,
    isLoading,
    isError: error as ErrorProps
  };
}