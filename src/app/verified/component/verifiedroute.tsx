"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
export default function VerifiedRoute({ role }: { role: string | undefined }) {
  const router = useRouter();
  const controls = useAnimation();
  const xControls = useAnimation();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (role === "admin") router.push("/dashboard/admin");
      else if (role === "user") router.push("/dashboard/user");
      else {
        return router.push("/");
      }
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    if (role) {
      controls.start({
        pathLength: 1,
        transition: { duration: 0.5, ease: "easeInOut" },
      });
    } else {
      xControls.start({
        pathLength: 1,
        transition: { duration: 0.5, ease: "easeInOut" },
      });
    }
  }, [controls]);
  return (
    <div className="min-h-screen h-full w-full flex justify-center items-center">
      <div className="bg-[#629677] text-black p-4 rounded-md text-center">
        {role ? (
          <>
            <div className="size-12 bg-green-500 mx-auto rounded-full flex items-center justify-center mb-4">
              <motion.svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M5 13L9 17L19 7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={controls}
                />
              </motion.svg>
            </div>
            <p className=" font-semibold">User Authenticated</p>
          </>
        ) : (
          <>
            <div className="size-12 bg-red-500 mx-auto rounded-full flex items-center justify-center mb-4">
              <motion.svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M6 6L18 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={xControls}
                />
                <motion.path
                  d="M6 18L18 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={xControls}
                />
              </motion.svg>
            </div>
            <p className="font-semibold">Authentication Failed</p>
          </>
        )}
        <p className="text-xs">
          Redirected to {role ? "Dashboard" : "Home"} in 4 second
        </p>
      </div>
    </div>
  );
}
