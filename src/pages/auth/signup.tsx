import SignUpForm from "./component/signup_form"
import Link from "next/link"
export default function SignUpPage() {
    return (
    <>
    <div className="h-full w-screen flex flex-col justify-center items-center bg-amber-300">
        <SignUpForm/>
                <Link href={"/auth/signin"}>Click Here to Login</Link>
    </div></>)
}