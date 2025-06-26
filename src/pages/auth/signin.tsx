import GoogleSignInButton from "./component/google"
export default function SignInPage() {
    return (<div className="h-full w-screen flex justify-center items-center">
        <form className="h-96 w-5/6 max-w-[600px] border border-black bg-black">
        <GoogleSignInButton/>
        </form>
    </div>)
}