import React from "react";
import type { OwnerQuizType } from "../../../../../lib/validation/quiz";
import Image from "next/image";
interface CardCompProps {
  item: OwnerQuizType;
  handleShareCode: (code: string) => void;
}

const CardComp = React.memo(function CardComp({ item, handleShareCode }: CardCompProps) {
  const stripedBG = {
    backgroundImage:
      "repeating-linear-gradient(45deg, #e1e1e1 0, #e1e1e1 1px, transparent 0, transparent 50%)",
    backgroundSize: "10px 10px",
    backgroundAttachment: "fixed",
  };

  return (
    <div className="group w-48 h-52 flex flex-col justify-between overflow-hidden rounded-md border border-gray-400 shadow-main">
      <div style={stripedBG} className="w-full bg-white h-full flex items-center justify-center">
        <Image src={item.image} width={48} height={48} alt="Logo-category" />
      </div>
      <div className="w-full h-52 text-neutral-700 bg-white relative border-t border-t-gray-400 py-3 px-2">
        <div className="absolute -top-2 left-2 bg-amber-300 w-11 h-5" />
        <div className="absolute -top-2 right-2 bg-amber-300 w-11 h-5" />
        <h2 className="line-clamp-2 text-ellipsis">{item.titleQuiz}</h2>
        <button type="button" onClick={() => handleShareCode(item.enterID)} className="bg-amber-200">
          Share join code
        </button>
      </div>
    </div>
  );
});
CardComp.displayName = "CardComp";
CardComp.whyDidYouRender = true;
export default CardComp;
