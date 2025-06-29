"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function Modal({
  show = false,
  messages,
}: {
  show: boolean;
  messages: string;
}) {
  const [isMounted, setIsMounted] = useState(show);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isMounted) {
      timer = setTimeout(() => {
        setIsMounted(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [show]);
  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          className="fixed top-4 translate-y-1/2 bg-red-600 size-42"
        >
          {messages}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
