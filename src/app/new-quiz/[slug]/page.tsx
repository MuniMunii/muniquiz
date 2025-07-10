import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOption";
import { redirect } from "next/navigation";
export default async function NewQuiz({params}:{params:Promise<{slug:string}>}){
    const {slug} =await params;
    const session=await getServerSession(authOptions)
    const user=session?.user
    if(!session){
        redirect('/')
    }
  const loggedInUsername = user?.username;
  if (slug !== loggedInUsername) {
    redirect("/403");
  }
  return (<div>
    hi this new add quiz
  </div>)
}