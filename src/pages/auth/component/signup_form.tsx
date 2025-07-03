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
  // state for handle validation UI
  const [validation, setValidation] = useState<
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
        return setError((e) => ({
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
  // useEffect reset animation notifications
  useEffect(() => {
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => {
      setError((e) => ({ message: "", show: false }));
      setSuccess((e) => ({ message: "", show: false }));
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
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submit", error || success);
          handleSubmit(e);
        }}
        className="h-96 border border-black bg-black flex justify-center items-center flex-col gap-4"
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
