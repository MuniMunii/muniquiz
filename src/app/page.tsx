  'use server';
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOption";
import { NavbarMain } from "./component/navbarMain";
  export default async function Home() {
    const session=await getServerSession(authOptions)
    console.log(session)
    return (
      <div className="size-full min-h-screen">
        {/* <Link href={'/auth/signin'}>Sign In</Link>
        <SignoutButton session={!!session}/> */}
        <NavbarMain/>
      </div>
    );
  }
