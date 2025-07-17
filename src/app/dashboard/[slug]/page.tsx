import {Navbar1} from "./component/navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOption";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHourglass,faPenToSquare} from "@fortawesome/free-regular-svg-icons"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MyQuiz from "./component/myquiz";
import JoinInput from "@/app/component/joinInput";
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
        <div className="w-full h-fit bg-white border-gray-400 rounded-md max-md:flex-col-reverse flex p-10 gap-3 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <div className="flex items-center w-[60%] max-md:w-full text-black gap-3">
            <JoinInput/>
          </div>
          {/* profile */}
          <div className="h-full w-2/5 max-md:w-full bg-violet-200 rounded-md flex-col flex p-4 gap-6 justify-between shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <h1 className="text-xl text-slate-800">Hello, {user?.username}</h1>
          {user?.image?<Image src={user?.image} alt="User Profile" width={120} height={120} className="rounded-full self-center"/>:''}
          <Button type="button"className="flex gap-3 items-center bg-indigo-500 hover:bg-indigo-600 w-fit py-1.5 px-2.5 rounded-md"><FontAwesomeIcon icon={faPenToSquare}/>Edit Profile</Button>
          </div>
        </div>
        <div className="w-full mt-3">
          <h2 className="text-3xl text-black">Recent Quiz</h2>
          <div className="w-full h-fit p-2 bg-amber-300 flex gap-3 items-center rounded-md">
            <div className="w-48 h-32 rounded-md bg-amber-50"></div>
            <div className="w-48 h-32 rounded-md bg-amber-50"></div>
            <div className="w-48 h-32 rounded-md bg-amber-50"></div>
            <MyQuiz />
          </div>
        </div>
      </div>
    </div>
  );
}