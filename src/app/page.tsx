  'use server';
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOption";
import { NavbarMain } from "./component/navbarMain";
// import { v4 } from "uuid";
  export default async function Home() {
    const session=await getServerSession(authOptions)
    console.log(session)
    // console.log(v4())
    return (
      <div className="size-full min-h-screen">
        {/* <Link href={'/auth/signin'}>Sign In</Link>
        <SignoutButton session={!!session}/> */}
        <NavbarMain/>
      </div>
    );
  }
