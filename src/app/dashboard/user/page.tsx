import {Navbar1} from "./component/navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOption";
import { redirect } from "next/navigation";
export default async function DashboardUserPage() {
  const session=await getServerSession(authOptions)
  if(!session){
    return redirect('/verified')
  }
  return (
    <div className="w-full h-full min-h-screen">
      <Navbar1/>
    </div>
  );
}