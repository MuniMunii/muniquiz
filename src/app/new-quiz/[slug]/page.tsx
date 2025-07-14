import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOption";
import { redirect } from "next/navigation";
import AddQuiz from "../component/form_add_quiz";
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
  return <div className="size-full min-h-screen pt-10 pb-5"><AddQuiz user={user}/></div>
}