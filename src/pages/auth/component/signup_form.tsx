"use client";
import GoogleSignInButton from "./google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "../../../app/component/modal";
import Link from "next/link";
interface FormState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpForm() {
  const [formState, setFormState] = useState<FormState>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // state for handle validation UI
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_validation, setValidation] = useState<
    Record<keyof FormState, boolean>
  >({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [error, setError] = useState({ message: "", show: false });
  const [success, setSuccess] = useState({ message: "", show: false });
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const passwordIsMatch = formState.password === formState.confirmPassword;
    // state for handle validation
    const newValidation: Record<keyof FormState, boolean> = {
      username: !formState.username,
      email: !formState.email,
      password: !formState.password,
      confirmPassword: !passwordIsMatch,
    };
    // Update UI validation state
    setValidation(newValidation);
    const hasError = Object.values(newValidation).some((v) => v);
    if (hasError) {
      const message = !passwordIsMatch
        ? "Passwords do not match"
        : "All fields are required";
      setValidation(newValidation);
      setError({ show: true, message });
      return;
    }
    try {
      const response = await fetch("/api/account/add-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const data = await response.json();
      if (!response.ok) {
        return setError(({
          show: data.status,
          message:
            data.error ||
            "An error occurred while creating your account. Please try again later.",
        }));
      }
      if (data.status) {
        // Redirect to signin
        setTimeout(() => {
          router.push("/auth/signin");
        }, 4000);
        setSuccess(({
          show: data.status,
          message: "Account created successfully! You can now log in.",
        }));
      } else {
        setError(({
          show: data.status,
          message: data.messages,
        }));
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      return setError(({
        show: true,
        message:
          "An error occurred while creating your account. Please try again later.",
      }));
    }
  };
  // useEffect reset animation notifications
  useEffect(() => {
    /* eslint-disable prefer-const */
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => {
      setError(({ message: "", show: false }));
      setSuccess(({ message: "", show: false }));
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [error.show, success.show]);
  return (
    <>
      <Modal
        messages={error.message || success.message}
        show={error.show || success.show}
        success={success.show}
      />
      <form
        onSubmit={handleSubmit}
        className={`h-fit py-8 px-10 w-full min-w-fit max-w-[400px] bg-[#FFF0F5]  text-[#5D3A3A] rounded-md shadow-[10px_10px_3px_0px_#d53f8c] backdrop-blur-md`}
      >
        <h1 className="text-center uppercase text-3xl font-bold">Register</h1>
        <div className="flex flex-col items-center justify-center mt-10 gap-3">
        <div className="relative z-0 w-full mt-4">
            <input
              type="text"
              id="username"
              onChange={(e) =>
                setFormState((state) => ({
                  ...state,
                  username: e.target.value,
                }))
              }
              autoComplete="off"
              placeholder=" "
              className="block py-2.5 px-0 w-full text-sm text-pink-900 bg-transparent border-0 border-b-2 border-pink-300 appearance-none dark:text-[#5D3A3A] dark:border-pink-400 dark:focus:border-[#C71585] focus:outline-none focus:ring-0 focus:border-[#C71585] peer"
            />
            <label
              htmlFor="username"
              className="absolute text-sm text-pink-500 dark:text-pink-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:border-[#C71585]  peer-focus:dark:border-[#C71585]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Username
            </label>
          </div>
        <div className="relative z-0 w-full mt-4">
            <input
              type="email"
              id="email"
              onChange={(e) =>
                setFormState((state) => ({
                  ...state,
                  email: e.target.value,
                }))
              }
              autoComplete="off"
              placeholder=" "
              className="block py-2.5 px-0 w-full text-sm text-pink-900 bg-transparent border-0 border-b-2 border-pink-300 appearance-none dark:text-[#5D3A3A] dark:border-pink-400 dark:focus:border-[#C71585] focus:outline-none focus:ring-0 focus:border-[#C71585] peer"
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-pink-500 dark:text-pink-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:border-[#C71585]  peer-focus:dark:border-[#C71585]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Email
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
              autoComplete="off"
              placeholder=" "
              className="block py-2.5 px-0 w-full text-sm text-pink-900 bg-transparent border-0 border-b-2 border-pink-300 appearance-none dark:text-[#5D3A3A] dark:border-pink-400 dark:focus:border-[#C71585] focus:outline-none focus:ring-0 focus:border-[#C71585] peer"
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-pink-500 dark:text-pink-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:border-[#C71585]  peer-focus:dark:border-[#C71585]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Password
            </label>
          </div>
        <div className="relative z-0 w-full mt-4">
            <input
              type="password"
              id="confirm-password"
              onChange={(e) =>
                setFormState((state) => ({
                  ...state,
                  confirmPassword: e.target.value,
                }))
              }
              autoComplete="off"
              placeholder=" "
              className="block py-2.5 px-0 w-full text-sm text-pink-900 bg-transparent border-0 border-b-2 border-pink-300 appearance-none dark:text-[#5D3A3A] dark:border-pink-400 dark:focus:border-[#C71585] focus:outline-none focus:ring-0 focus:border-[#C71585] peer"
            />
            <label
              htmlFor="confirm-password"
              className="absolute text-sm text-pink-500 dark:text-pink-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:border-[#C71585]  peer-focus:dark:border-[#C71585]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Confirm Password
            </label>
          </div>
        <button type="submit" className="cursor-pointer bg-[#E75480] text-white rounded-sm w-full py-2 hover:translate-y-0.5 hover:translate-x-0.5 transition duration-200 ease-ins">
            Register
        </button>
        <Link href={"/auth/signin"} className="group">Click Here to <span className="border-b border-b-inherit group-hover:border-b-blue-600">Login</span></Link>
        <GoogleSignInButton redirectUrl="/verified" />
        </div>
      </form>
    </>
  );
}
