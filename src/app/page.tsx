  'use server';
  import Link from "next/link";
import SignoutButton from "./component/signout";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOption";
  export default async function Home() {
    const session=await getServerSession(authOptions)
    console.log(session)
    return (
      <div className="size-full bg-amber-400 flex gap-4">
        <Link href={'/auth/signin'}>Sign In</Link>
        <SignoutButton session={!!session}/>
      </div>
    );
  }
