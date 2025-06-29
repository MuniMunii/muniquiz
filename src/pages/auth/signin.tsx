import GoogleSignInButton from "./component/google";
import Link from "next/link";
import Modal from "./component/modal";
import { useSearchParams } from "next/navigation";
export default function SignInPage() {
  const params = useSearchParams();
  const error = params?.get("error");
  return (
    <>
      <Modal messages={error || ""} show={!!error} />
      <div className="h-full w-screen flex justify-center items-center">
        <form className="h-96 w-5/6 max-w-[600px] border border-black bg-black flex justify-center items-center flex-col gap-4">
          <GoogleSignInButton redirectUrl="/" />
          <Link href={"signup"}>Click Here to register</Link>
        </form>
      </div>
    </>
  );
}
