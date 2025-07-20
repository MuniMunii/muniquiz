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
import { faFileImage } from "@fortawesome/free-regular-svg-icons";
export default function MyQuiz() {
  const { Quiz, isLoading, isError } = useQuiz({ url: "get-myquiz" });
  const isLaptop = useMediaQuery("(min-width:1024px)");
  const isPhone = useMediaQuery("(min-width:320px)");
  const isTablet = useMediaQuery("(min-width:764px)");
  const stripedBG = {
    backgroundImage:
      "repeating-linear-gradient(45deg, #e1e1e1 0, #e1e1e1 1px, transparent 0, transparent 50%)",
    backgroundSize: "10px 10px",
    backgroundAttachment: "fixed",
  };
  const SkeletonLoadingComp=isLoading&&[1].map((_, index) => (
            <SkeletonLoading key={`SkeletonCard-${index}`} />
        ))
// if (isLaptop && isLoading) {
//   return (
//     <div className="w-full h-fit p-4 bg-green-700 flex items-center rounded-md relative gap-4">
//       {SkeletonLoadingComp}
//     </div>
//   );
// }
  if (isLaptop) {
    return (
      <div
        className={`w-full h-fit p-4 lg 
          ${isPhone ? "bg-green-900" : ""} 
          ${isTablet ? "bg-green-800" : ""} 
          ${isLaptop ? "bg-green-700" : ""} flex items-center rounded-md relative gap-4`}
      >
        {isLoading&&SkeletonLoadingComp}
        {Quiz.slice(0,5).map((item, _) => (
          <div key={item.enterID} className="w-48 h-52 flex flex-col  justify-between overflow-hidden rounded-md">
            <div style={stripedBG} className="w-full h-full flex items-center justify-center"><FontAwesomeIcon icon={faFileImage}/></div>
            <div className="w-full h-52 bg-white"></div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <>
      {" "}
      <Carousel
        orientation="horizontal"
        className={`w-full h-fit p-4 lg
          bg-green-700 
          ${isPhone ? "bg-green-900" : ""} 
          ${isTablet ? "bg-green-800" : ""} 
          ${isLaptop ? "bg-green-700" : ""}
         flex gap-4 items-center rounded-md relative`}
      >
        <CarouselContent className={`${!isLaptop?'ml-1':'ml-0'}`}>
          {(isLoading&&!isLaptop)&&SkeletonLoadingComp}
          {[1,2,3,4,5,6,7,8,9,10].map((item,_) => (
            <CarouselItem
              key={_}
              className="basis-52 rounded-md overflow-hidden"
            >
              <div className="w-48 h-52 flex flex-col justify-between overflow-hidden rounded-md">
<div style={stripedBG} className="w-full h-full flex items-center justify-center"><FontAwesomeIcon icon={faFileImage}/></div>
            <div className="w-full h-52 bg-white"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 text-black z-10"/>
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 text-black z-10"/>
      </Carousel>
    </>
  );
}
