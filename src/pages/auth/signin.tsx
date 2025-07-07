import Modal from "./component/modal";
import { useSearchParams } from "next/navigation";
import SignInForm from "./component/signin_form";
export default function SignInPage() {
  const params = useSearchParams();
  const error = params?.get("error");
  return (
    <>
      <Modal messages={error || ""} show={!!error} />
      <div className="h-full min-h-screen p-4 w-full flex justify-center items-center">
        <SignInForm/>
      </div>
    </>
  );
}
