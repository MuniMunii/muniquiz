"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function Modal({
  show,
  messages,
  success 
}: {
  show: boolean;
  messages: string;
  success?: boolean;
}) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    console.log(show,isMounted)
    setIsMounted(show)
  }, [show]);
  useEffect(()=>{
        let timer: NodeJS.Timeout;
    if (isMounted) {
      timer = setTimeout(() => {
        setIsMounted(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  },[isMounted])
  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          className={`fixed top-4 translate-y-1/2 ${success?'bg-green-600':'bg-red-600'} size-42`}
        >
          {messages}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
