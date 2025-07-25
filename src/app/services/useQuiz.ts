import type { OwnerQuizType } from "../../../lib/validation/quiz";
import useSWR from "swr";
import { useMemo } from "react";
export default function useQuiz<T extends boolean>({ url, singleQuiz }: { url: string, singleQuiz: T }) {
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data, error, isLoading } = useSWR(`/api/quiz/${url}`, fetcher,    {
      // Prevent flickering by disabling automatic revalidation
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      // Keep cache fresh but reduce flickering
      dedupingInterval: 2000, // Prevent duplicate requests within 2 seconds
      // Optional: Set cache time
      focusThrottleInterval: 5000, // If you want some focus revalidation
      // Keep data while revalidating (prevents showing loading state)
      keepPreviousData: true,
    });
  type QuizType = T extends true ? OwnerQuizType : OwnerQuizType[];
const memoizedQuiz: QuizType = useMemo(() => {
  return singleQuiz
    ? (data?.data as QuizType)
    : (Array.isArray(data?.data) ? data.data : []) as QuizType;
}, [data?.data]);
  return {
    Quiz: memoizedQuiz,
    isLoading,
    isError: error as ErrorProps
  };
}