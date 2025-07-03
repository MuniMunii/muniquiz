import SignUpForm from "./component/signup_form"
import Link from "next/link"
export default function SignUpPage() {
    return (
    <>
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-amber-300">
        <div className="w-5/6 max-w-[600px]">
        <SignUpForm/>
        <Link href={"/auth/signin"}>Click Here to Login</Link>
        </div>
    </div></>)
}