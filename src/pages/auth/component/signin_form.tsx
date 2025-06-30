"use client";
import GoogleSignInButton from "./google";
import Link from "next/link";
import { useState } from "react";
interface FormState{
    username: string;
    email:string;
    password:string;
    confirmPassword:string;
}
export default function SignUpForm() {
  const [formState, setFormState] = useState<FormState>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <form
      onSubmit={() => {
        console.log("submit");
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
          setFormState((state) => ({ ...state, password: e.target.value }))
        }
        placeholder="Confirm Password"
        type="password"
      />
      <GoogleSignInButton redirectUrl="/auth/signin" />
    </form>
  );
}
