"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function Modal({
  show,
  messages,
  success,
  list
}: {
  show: boolean;
  messages: string;
  success?: boolean;
  list?:IssuesProps[]
}) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
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
          initial={{ y: -100,opacity:0 }}
          animate={{ y: 0,opacity:1 }}
          exit={{ y: -100,opacity:0 }}
          className={`fixed top-3 z-20 left-1/2 -translate-x-1/2 rounded-md bg-neutral-200/70 border-neutral-500 border ${success?'text-green-600':'text-red-600'} min-h-fit max-h-42 w-72`}
        >
          <div className="size-full relative pt-5 px-3 pb-3 flex flex-col justify-between">
            <button className="absolute top-0 right-2 text-black font-semibold" onClick={()=>setIsMounted(false)}>X</button>
          <p className="text-center">{messages}</p>
          {list&&(
          <ul className="text-center text-xs">
            {list.map((item,index)=><li key={item.message+index}>{item.path}: {item.message}</li>)}
          </ul>)}
          <p className="text-neutral-800 text-center text-xs mt-2">This Message will close automatically</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
