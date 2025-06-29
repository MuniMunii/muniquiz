'use client';
import { signIn } from "next-auth/react";

export default function GoogleSignInButton({redirectUrl}:{redirectUrl: string}) {
  return (
    <button
      onClick={(e) => { e.preventDefault();
      signIn("google", { callbackUrl: redirectUrl });}}
      className="flex flex-col border border-black items-center justify-center bg-white text-black rounded p-2 hover:bg-gray-100"
    >
      <img src="/google.svg" alt="Google" className="mr-2" />
      Sign in with Google
    </button>
  );
}
