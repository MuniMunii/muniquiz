"use client";
import GoogleSignInButton from "./google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "./modal";
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
  const [error, setError] = useState({ message: "", show: false });
  const [success, setSuccess] = useState({ message: "", show: false });
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.password !== formState.confirmPassword)
      return setError((e) => ({
        show: true,
        message: "Password do not match",
      }));
    if (!formState.username || !formState.email || !formState.password)
      return setError((e) => ({
        show: true,
        message: "All fields are required",
      }));
    try {
      const response = await fetch("/api/account/add-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const data = await response.json();
      if (!response.ok) {
        return setError((e) => ({
          show: data.status,
          message:
            data.error ||
            "An error occurred while creating your account. Please try again later.",
        }));
      }
      if (data.status) {
        setTimeout(() => {
          router.push("/auth/signin");
        }, 4000);
        setSuccess((e) => ({
          show: data.status,
          message: "Account created successfully! You can now log in.",
        }));
      } else {
        setError((e) => ({
          show: data.status,
          message: data.messages,
        }));
      }
    } catch (error) {
      return setError((e) => ({
        show: true,
        message:
          "An error occurred while creating your account. Please try again later.",
      }));
    }
  };
  useEffect(() => {
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => {
      setError((e) => ({ ...e, show: false }));
      setSuccess((e) => ({ ...e, show: false }));
    }, 5000);
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
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submit", error || success);
          handleSubmit(e);
        }}
        className="h-96 w-5/6 max-w-[600px] border border-black bg-black flex justify-center items-center flex-col gap-4"
      >
        <input
          onChange={(e) =>
            setFormState((state) => ({ ...state, username: e.target.value }))
          }
          placeholder="Username"
        />
        <input
          onChange={(e) =>
            setFormState((state) => ({ ...state, email: e.target.value }))
          }
          placeholder="Email"
          type="email"
        />
        <input
          onChange={(e) =>
            setFormState((state) => ({ ...state, password: e.target.value }))
          }
          placeholder="Password"
          type="password"
        />
        <input
          onChange={(e) =>
            setFormState((state) => ({
              ...state,
              confirmPassword: e.target.value,
            }))
          }
          placeholder="Confirm Password"
          type="password"
        />
        <button type="submit">Submit</button>
        <GoogleSignInButton redirectUrl="/auth/signin" />
      </form>
    </>
  );
}
