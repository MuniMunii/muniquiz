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
import { faFileImage,faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { OwnerQuizType } from "../../../../../lib/validation/quiz";
import Image from "next/image";
import {motion} from 'framer-motion'
export default function MyQuiz() {
  const { Quiz, isLoading, isError } = useQuiz({ url: "get-myquiz",singleQuiz:false });
  const isLaptop = useMediaQuery("(min-width:1024px)");
  const isPhone = useMediaQuery("(min-width:320px)");
  const isTablet = useMediaQuery("(min-width:764px)");
  const stripedBG = {
    backgroundImage:
      "repeating-linear-gradient(45deg, #e1e1e1 0, #e1e1e1 1px, transparent 0, transparent 50%)",
    backgroundSize: "10px 10px",
    backgroundAttachment: "fixed",
  };
  const SkeletonLoadingComp =
    isLoading &&
    [1].map((_, index) => <SkeletonLoading key={`SkeletonCard-${index}`} />);
    const isErrorComp=isError&&<div className="text-center mx-auto">
      <FontAwesomeIcon className="text-red-500" icon={faXmarkCircle}/>
      <p className="text-neutral-100 font-semibold">{isError.message}</p>
    </div>
    const noQuizComp=Quiz.length===0&&<div className="text-center mx-auto">
      <FontAwesomeIcon className="text-red-500" icon={faXmarkCircle}/>
      <p className="text-neutral-100 font-semibold">You dont have quiz any yet</p>
    </div>
  // if (isLaptop && isLoading) {
  //   return (
  //     <div className="w-full h-fit p-4 bg-green-700 flex items-center rounded-md relative gap-4">
  //       {SkeletonLoadingComp}
  //     </div>
  //   );
  // }
  const handleShareCode = (code: string) => {
  navigator.clipboard.writeText(code)
    .then(() => console.log("Copied to clipboard:", code))
    .catch((err) => console.error("Failed to copy:", err))
}
const RenderContent = ({ carousel }: { carousel?: boolean }) => {
  if (isError) return isErrorComp
  if (Quiz.length === 0) return SkeletonLoadingComp

  if (carousel) {
    return (
      <CarouselContent className={`${!isLaptop ? "ml-1" : "ml-0"}`}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
          <CarouselItem
            key={`card-skele-${index}`}
            className="basis-52 rounded-md overflow-hidden"
          >
            <div className="w-48 h-52 flex flex-col justify-between overflow-hidden rounded-md">
              <div
                style={stripedBG}
                className="w-full h-full flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faFileImage} />
              </div>
              <div className="w-full h-52 bg-white"></div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    )
  }

  return Quiz.slice(0, 5).map((item, index) => (
    <CardComp key={`myquizCard-${index}`} item={item} />
  ))
}
  const CardComp=({item}:{item:OwnerQuizType})=>{
    return <div
            key={item.enterID}
            className="group w-48 h-52 flex flex-col justify-between overflow-hidden rounded-md border border-gray-400 shadow-main"
          >
            <div
              style={stripedBG}
              className="w-full bg-white h-full flex items-center justify-center"
            >
              {/* <FontAwesomeIcon className="text-black size-16" icon={faFileImage} /> */}
              <Image className="group-hover:scale-110 transition duration-300" src={item.image} width={48} height={48} alt="Logo-category"/>
            </div>
            <div className="w-full h-52 text-neutral-700 bg-white relative border-t border-t-gray-400 py-3 px-2">
              <div className="absolute -top-2 left-2 bg-amber-300 w-11 h-5"></div>
              <div className="absolute -top-2 right-2 bg-amber-300 w-11 h-5"></div>
              <h2 className="line-clamp-2 text-ellipsis">{item.titleQuiz}</h2>
              <button type="button" onClick={()=>handleShareCode(item.enterID)} className="bg-amber-200">Share join code</button>
            </div>
          </div>}
  if (isLaptop) {
    return (
      <>
      <div
        className={`w-full h-fit min-h-52 p-4 lg 
          ${isPhone ? "bg-green-900" : ""} 
          ${isTablet ? "bg-green-800" : ""} 
          ${
            isLaptop ? "bg-green-700" : ""
          } flex items-center rounded-md relative gap-4`}
      >
        <RenderContent/>
      </div>
    </>);
  }
  return (
    <>
      {" "}
      <Carousel
        orientation="horizontal"
        className={`w-full h-fit min-h-52 p-4 lg
          bg-green-700
          ${isPhone ? "bg-green-900" : ""} 
          ${isTablet ? "bg-green-800" : ""} 
          ${isLaptop ? "bg-green-700" : ""}
         flex gap-4 items-center rounded-md relative`}
      >
        <RenderContent carousel/>
        {(!isError&&Quiz.length!==0)&&<><CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 text-black z-10" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 text-black z-10" /></>}
      </Carousel>
    </>
  );
}
