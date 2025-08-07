"use client";

import { AnimatePresence, motion, usePresenceData, wrap } from "motion/react";
import { forwardRef, SVGProps, useEffect, useState } from "react";
import {
  AnswerChoiceType,
  QuestionType,
} from "../../../../../../lib/validation/quiz";
import AnswerButton from "./answerButton";
const iconsProps: SVGProps<SVGSVGElement> = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
export default function SlideQuiz({
  question,
  isLoading
}: {
  question: QuestionType[] |[]| undefined;
  isLoading:boolean
}) {
if (isLoading) return <div>Loading questions...</div>;
  if (!question) return <div>Loading questions...</div>;
  if (question?.length === 0) return <div>No questions available</div>;
  const items = question;
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);
  function setSlide(newDirection: number) {
    const nextItem = selectedItem + newDirection;
    if (nextItem < 0 || nextItem >= items.length) {
      return;
    }
    setSelectedItem(nextItem);
    setDirection((prev) => prev + newDirection);
  }
  if (isDone) {
    return <div>Its Done</div>;
  }
  return (
    <div className="size-full grow flex flex-col overflow-hidden">
      <AnimatePresence custom={direction} initial={false} mode="popLayout">
        <Slide key={selectedItem} question={items[selectedItem]} />
      </AnimatePresence>
      <div className="w-full h-fit flex">
        <AnimatePresence>
          <AnswerButton items={items} selectedItem={selectedItem} setIsDone={setIsDone} setSlide={setSlide}/>
        </AnimatePresence>
      </div>
    </div>
  );
}

const Slide = forwardRef(function Slide(
  { question }: { question: QuestionType },
  ref: React.Ref<HTMLDivElement>
) {
  const direction = usePresenceData();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          delay: 0.2,
          // type: "spring",
          visualDuration: 0.3,
        },
      }}
      exit={{ opacity: 0, x: direction * -50 }}
      // style={{ backgroundColor: color }}
      className="bg-amber-300 grow flex justify-center items-center w-full"
    >
      {question.title}
    </motion.div>
  );
});
