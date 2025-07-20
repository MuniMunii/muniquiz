import {Navbar1} from "./component/navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOption";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-regular-svg-icons"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MyQuiz from "./component/myquiz";
import JoinInput from "@/app/component/joinInput";
import { useSession } from "next-auth/react";
export default async function DashboardUserPage({params}:{params:Promise<{slug:string}>}) {
  const {slug} =await params;
  const session=await getServerSession(authOptions)
  const user=session?.user
  if(!session){
    return redirect('/verified')
  }
  const loggedInUsername = session.user.username;
  if (slug !== loggedInUsername) {
    redirect("/403");
  }
  return (
    <div className="w-full h-full min-h-screen">
      <Navbar1 username={user?.username}/>
      {/*  */}
      <div className="max-w-[1200px] w-[90%] mx-auto mt-7">
        {/* profile info/search code */}
        <div className="w-full h-fit bg-white border-gray-400 rounded-md max-md:flex-col-reverse flex p-10 gap-3 shadow-main">
          <div className="flex items-center w-[60%] max-md:w-full text-black gap-3">
            <JoinInput/>
          </div>
          {/* profile */}
          <div className="h-full w-2/5 max-md:w-full bg-violet-200 rounded-md flex-col flex p-4 gap-6 justify-between shadow-main">
          <h1 className="text-xl text-slate-800">Hello, {user?.username}</h1>
          {user?.image?<Image src={user?.image} alt="User Profile" width={120} height={120} className="rounded-full self-center"/>:''}
          <Button type="button"className="flex gap-3 items-center bg-indigo-500 hover:bg-indigo-600 w-fit py-1.5 px-2.5 rounded-md"><FontAwesomeIcon icon={faPenToSquare}/>Edit Profile</Button>
          </div>
        </div>
        <div className="w-full mt-3">
          <h2 className="text-3xl text-black">Recent Quiz</h2>
            <MyQuiz />
        </div>
      </div>
    </div>
  );
}