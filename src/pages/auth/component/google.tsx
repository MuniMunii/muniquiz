'use client';
import { signIn } from "next-auth/react";
import Image from "next/image";
import GoogleButton from './image/googleButton.png'
export default function GoogleSignInButton({redirectUrl,className}:{redirectUrl: string,className?:string}) {
  return (
    <button
  onClick={(e) => {
    e.preventDefault();
    signIn("google", { callbackUrl: redirectUrl });
  }}
  className={`inline-block border-none bg-transparent p-0 m-0 cursor-pointer ${className??''}`}
>
  <Image
    src={GoogleButton}
    alt="Sign in with Google"
    width={0}
    height={0}
    sizes="100vw"
    style={{ height: 'auto', width: 'auto' }}
    priority
  />
</button>
  );
}
