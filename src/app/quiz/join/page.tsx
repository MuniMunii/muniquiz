import { authOptions } from "../../../../lib/authOption";
import { getServerSession } from "next-auth";
import { NavbarMain } from "@/app/component/navbarMain";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass } from "@fortawesome/free-regular-svg-icons";
export default async function JoinPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <div className="size-full min-h-screen">
      <NavbarMain />
      <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full h-screen max-w-[1000px] max-h-[500px] mx-auto flex items-center justify-center bg-amber-300">
        <div className="flex flex-row items-center bg-slate-100 w-full max-w-[600px] p-3 gap-3 rounded-2xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] text-neutral-800">
          <input
            type="text"
            className="h-16 w-full pl-4 border bg-white border-gray-400 outline-none rounded-xl"
            placeholder="Enter a join code"
          />
          <Button className="bg-pink-400 hover:bg-pink-500 px-2 py-1 size-fit rounded-sm flex items-center gap-2">
            <FontAwesomeIcon icon={faHourglass} />
            Search
          </Button>
        </div>
      </div>
      </div>
    </div>
  );
}
