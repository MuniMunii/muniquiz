'use server';
import { authOptions } from "../../../lib/authOption";
  import { getServerSession } from "next-auth";
import VerifiedRoute from "./component/verifiedroute";
export default async function VerifiedPage(){
    const session=await getServerSession(authOptions)
    return <VerifiedRoute role={session?.user.role} username={session?.user.username}/>
}