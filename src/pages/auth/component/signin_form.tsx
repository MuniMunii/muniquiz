"use client";
import { signIn } from "next-auth/react";
import GoogleSignInButton from "./google";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
interface FormState {
  username: string;
  password: string;
}
interface ErrorState {
  error: boolean;
  message: string | null | undefined;
}
export default function SignInForm() {
  const [formState, setFormState] = useState<FormState>({
    username: "",
    password: "",
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_error, setError] = useState<ErrorState>({
    error: false,
    message: "",
  });
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(formState);
    const res = await signIn("credentials", {
      redirect: false,
      username: formState.username,
      password: formState.password,
    });
    if (res?.ok) {
      router.push("/verified");
    } else {
      setError({ error: true, message: res?.error });
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`h-fit py-8 px-6 w-full min-w-fit max-w-[400px] bg-[#FFF0F5]  text-[#5D3A3A] rounded-md shadow-[10px_10px_3px_0px_#d53f8c] backdrop-blur-md`}
      >
        <h1 className="text-center uppercase text-3xl font-bold">Login</h1>
        <div className="flex flex-col items-center justify-center mt-10 gap-3">
          <div className="relative z-0 w-full">
            <input
              type="text"
              id="username"
              value={formState.username}
              onChange={(e) =>
                setFormState((state) => ({
                  ...state,
                  username: e.target.value,
                }))
              }
              placeholder=" "
              className="block py-2.5 px-0 w-full text-sm text-pink-900 bg-transparent border-0 border-b-2 border-pink-300 appearance-none dark:text-[#5D3A3A] dark:border-pink-400 dark:focus:border-[#E75480] focus:outline-none focus:ring-0 focus:border-[#E75480] peer"
            />
            <label
              htmlFor="username"
              className="absolute text-sm text-pink-500 dark:text-pink-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:border-[#E75480] peer-focus:dark:border-[#E75480] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Username
            </label>
          </div>
          <div className="relative z-0 w-full mt-4">
            <input
              type="password"
              id="password"
              onChange={(e) =>
                setFormState((state) => ({
                  ...state,
                  password: e.target.value,
                }))
              }
              placeholder=" "
              className="block py-2.5 px-0 w-full text-sm text-pink-900 bg-transparent border-0 border-b-2 border-pink-300 appearance-none dark:text-[#5D3A3A] dark:border-pink-400 dark:focus:border-[#C71585] focus:outline-none focus:ring-0 focus:border-[#C71585] peer"
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-pink-500 dark:text-pink-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:border-[#C71585]  peer-focus:dark:border-[#C71585]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto bg-transparent"
            >
              Password
            </label>
          </div>
          <button type="submit" className="cursor-pointer bg-[#E75480] text-white rounded-sm w-full py-2 hover:translate-y-0.5 hover:translate-x-0.5 transition duration-200 ease-ins">
            Login
          </button>
          <Link href={"/auth/signup"} className="group">Click Here to <span className="border-b border-b-inherit group-hover:border-b-blue-600">Register</span></Link>
          <GoogleSignInButton redirectUrl="/verified" />
        </div>
      </form>
    </>
  );
}
