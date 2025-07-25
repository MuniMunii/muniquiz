import useSWR from "swr"
import { Session} from "next-auth";
export default function useUser (id:string) {
const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data, error, isLoading } = useSWR(`/api/user/${id}`, fetcher)
  return {
    user: data as Session,
    isLoading,
    isError: error
  }
}