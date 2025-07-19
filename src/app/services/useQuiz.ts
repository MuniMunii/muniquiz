import useSWR from "swr"
import type { OwnerQuizType } from "../../../lib/validation/quiz"
export default function useQuiz ({url}:{url:string}) {
const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data, error, isLoading } = useSWR(`/api/quiz/${url}`, fetcher,{revalidateIfStale:true})
  return {
    Quiz:Array.isArray(data?.data) ? data.data as OwnerQuizType[] : [],
    isLoading,
    isError: error as ErrorProps
  }
}