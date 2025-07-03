"use client";
import { signIn } from "next-auth/react";
import GoogleSignInButton from "./google";
import { useState } from "react";
import { useRouter } from "next/navigation";
interface FormState{
    username: string;
    password:string;
}
interface ErrorState{
    error: boolean;
    message:string|null|undefined;
}
export default function SignUpForm() {
  const [formState, setFormState] = useState<FormState>({
    username: "",
    password: "",
  });
  const [error,setError]=useState<ErrorState>({
    error:false,
    message:''
  })
  const router=useRouter()
  async function handleSubmit(e:React.FormEvent){
    e.preventDefault()
    console.log(formState)
    const res=await signIn('credentials',{
      redirect:false,
      username:formState.username,
      password:formState.password
    })
    if(res?.ok){
      router.push('/')
    }
    else{
      setError(e=>({error:true,message:res?.error}))
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
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
          setFormState((state) => ({ ...state, password: e.target.value }))
        }
        placeholder="Password"
        type="password"
      />
        <button type="submit" className="cursor-pointer">Login</button>
      <GoogleSignInButton redirectUrl="/" />
    </form>
  );
}
