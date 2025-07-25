"use client";
import useQuiz from "@/app/services/useQuiz";
import SkeletonLoading from "@/app/component/skeleton/skeletonCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useMediaQuery from "@/app/hook/useMediaQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardComp from "./Card";
import { useSafelyChangeState } from "@/app/hook/useSafelyChangeState";
interface NotifCopyProps {
  active: boolean;
  msg: string;
}
export default function MyQuiz() {
  const { Quiz, isLoading, isError } = useQuiz({
    url: "get-myquiz",
    singleQuiz: false,
  });
  const {
    state: notifCopy,
    set: setIsNotifCopy,
    clear: clearNotifCopy,
  } = useSafelyChangeState<NotifCopyProps>({ active: false, msg: "" });
  // MediaQuery Test
  const isLaptop = useMediaQuery("(min-width:1024px)");
  const isPhone = useMediaQuery("(min-width:320px)");
  const isTablet = useMediaQuery("(min-width:764px)");
  const stripedBG = {
    backgroundImage:
      "repeating-linear-gradient(45deg, #e1e1e1 0, #e1e1e1 1px, transparent 0, transparent 50%)",
    backgroundSize: "10px 10px",
    backgroundAttachment: "fixed",
  };
  // Component for Skeleton loading card
  const SkeletonLoadingComp = [1].map((_, index) => (
    <SkeletonLoading key={`SkeletonCard-${index}`} />
  ));
  // Component for fallback error occured
  const isErrorComp = isError && (
    <div className="text-center mx-auto">
      <FontAwesomeIcon className="text-red-500" icon={faXmarkCircle} />
      <p className="text-neutral-100 font-semibold">{isError.message}</p>
    </div>
  );
   // Component for fallback when user not have quiz yet
  const noQuizComp = (
    <div className="text-center mx-auto">
      <FontAwesomeIcon className="text-red-500" icon={faXmarkCircle} />
      <p className="text-neutral-100 font-semibold">
        You dont have quiz any yet
      </p>
    </div>
  );
  // Function for copy button enter id
  const handleShareCode = useCallback((code: string) => {
    navigator.clipboard
      .writeText(code)
      .then(() => setIsNotifCopy({ active: true, msg: "Copied to clipboard" }))
      .catch(() => setIsNotifCopy({ active: true, msg: "Failed to copy" }));
  }, []);
  // Component notif when button is click
  const NotifyCopyComp = notifCopy.active && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="size-fit bg-black text-white px-2 py-1 rounded-md fixed bottom-2 left-2 z-[99]"
    >
      {notifCopy.msg}
    </motion.div>
  );
// Clean up state notif
  useEffect(() => {
    const timer = setTimeout(() => clearNotifCopy(), 3000);
    return () => clearTimeout(timer);
  }, [notifCopy]);
  // Render component matching when its error,loading,Quiz is empty,and carousel
  /*
  @params carousel:boolean
  take carousel boolean to place component if its in carousel container/not
   */
  const RenderContent = ({ carousel }: { carousel?: boolean }) => {
    if (isError) return isErrorComp;
    if (isLoading) return SkeletonLoadingComp;
    if (Quiz.length === 0) return noQuizComp;
    if (carousel) {
      return (
        <CarouselContent className={`${!isLaptop ? "ml-1" : "ml-0"}`}>
          {Quiz.slice(0, 10).map((item, index) => (
            <CarouselItem
              key={`card-skele-${index}`}
              className="basis-52 rounded-md overflow-hidden"
            >
              <div className="w-48 h-52 flex flex-col justify-between overflow-hidden rounded-md">
                <div
                  style={stripedBG}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Image
                    className=""
                    src={item.image}
                    width={48}
                    height={48}
                    alt="Logo-category"
                  />
                </div>
                <div className="w-full h-52 bg-white"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      );
    }
    return Quiz.slice(0, 5).map((item) => (
      <CardComp
        key={`myquizCard-${item.enterID}`}
        item={item}
        handleShareCode={handleShareCode}
      />
    ));
  };
  // Laptop render component
  if (isLaptop) {
    return (
      <>
        <AnimatePresence>{NotifyCopyComp}</AnimatePresence>
        <div
          className={`w-full h-fit min-h-52 p-4 lg 
          ${isPhone ? "bg-green-900" : ""} 
          ${isTablet ? "bg-green-800" : ""} 
          ${
            isLaptop ? "bg-green-700" : ""
          } flex items-center rounded-md relative gap-4`}
        >
          <RenderContent />
        </div>
      </>
    );
  }
  // default (!isLaptop) 
  return (
    <>
      <AnimatePresence>{NotifyCopyComp}</AnimatePresence>
      <Carousel
        orientation="horizontal"
        className={`w-full h-fit min-h-52 p-4 lg
          bg-green-700
          ${isPhone ? "bg-green-900" : ""} 
          ${isTablet ? "bg-green-800" : ""} 
          ${isLaptop ? "bg-green-700" : ""}
         flex gap-4 items-center rounded-md relative`}
      >
        <RenderContent carousel />
        {!isError && Quiz.length !== 0 && (
          <>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 text-black z-10" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 text-black z-10" />
          </>
        )}
      </Carousel>
    </>
  );
}
MyQuiz.displayName = "MyQuiz";
MyQuiz.whyDidYouRender = true;
