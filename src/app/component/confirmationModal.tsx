'use client'
import { AnimatePresence } from "framer-motion";
import useClickOutside from "../hook/useClickOutsideElement";
import { Button } from "@/components/ui/button";
interface ConfirmationModalProps{
    bypassNavigation:(url:string)=>void;
    cancelNavigation:()=>void;
    ConfirmationText:string;
    isAttemptingNavigation:boolean;
    href:string
}
export default function ConfirmationModal ({bypassNavigation,cancelNavigation,ConfirmationText,isAttemptingNavigation,href}:ConfirmationModalProps){
    const handleClickOutside=()=>{
        cancelNavigation()
    }
    const ref = useClickOutside<HTMLDivElement>(handleClickOutside);
    return <AnimatePresence>
        {isAttemptingNavigation&&<div ref={ref} className="fixed top-1/2 p-2 text-black -translate-y-1/2 left-1/2 text-center -translate-x-1/2 w-[250px] h-[150px] bg-[#F8F8FF] rounded-md flex flex-col items-center justify-between shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <p>{ConfirmationText}</p>
        <div className="flex items-center justify-center gap-3">
        <Button variant={"link"} onClick={()=>{bypassNavigation(href)}} type="button">Navigate</Button>
        <Button variant={"destructive"} onClick={()=>{cancelNavigation()}} type="button">Cancel</Button>
        </div>
        </div>}
    </AnimatePresence>
}