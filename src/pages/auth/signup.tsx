import GoogleSignInButton from "./component/google"
import Link from "next/link"
import Modal from "./component/modal"
import Form from "./component/form"
export default function SignUpPage() {
    return (
    <>
    <Modal messages="" show={false}/>
    <div className="h-full w-screen flex justify-center items-center">
        <Form/>
    </div></>)
}