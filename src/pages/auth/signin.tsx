import Modal from "./component/modal";
import { useSearchParams } from "next/navigation";
import SignInForm from "./component/signin_form";
import Link from "next/link";
export default function SignInPage() {
  const params = useSearchParams();
  const error = params?.get("error");
  return (
    <>
      <Modal messages={error || ""} show={!!error} />
      <div className="h-full w-screen flex justify-center items-center">
        <SignInForm/>
              <Link href={"/auth/signup"}>Click Here to Register</Link>
      </div>
    </>
  );
}
