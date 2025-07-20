import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileImage } from "@fortawesome/free-regular-svg-icons"
export default function SkeletonLoading(){
    return <div className="w-48 h-52 flex flex-col justify-between overflow-hidden rounded-md">
        <div className="w-full h-full bg-emerald-100 text-neutral-700 animate-pulse ani flex justify-center items-center"><FontAwesomeIcon className="text-5xl" icon={faFileImage}/></div>
        <div className="w-full h-52 bg-emerald-100 animate-pulse border-t border-t-gray-300 flex flex-col p-2 gap-1">
            <div className="flex gap-1"><div className="w-[70%] h-2 animate-pulse rounded-full bg-gray-400"/> <div className="w-[30%] h-2 animate-pulse rounded-full bg-gray-700"/></div>
            <div className="flex"><div className="w-full h-2 animate-pulse rounded-full bg-gray-600 delay-75"/></div>
                        <div className="flex gap-1"><div className="w-[20%] h-2 animate-pulse rounded-full bg-gray-400"/> <div className="w-[80%] h-2 animate-pulse rounded-full bg-gray-700"/></div>
                                    <div className="flex gap-1"><div className="w-[50%] h-2 animate-pulse rounded-full bg-gray-400"/> <div className="w-[50%] h-2 animate-pulse rounded-full bg-gray-700"/></div>
                                                <div className="flex gap-1"><div className="w-[40%] h-2 animate-pulse rounded-full bg-gray-400"/> <div className="w-[60%] h-2 animate-pulse rounded-full bg-gray-700"/></div>
                                                            <div className="flex gap-1"><div className="w-[30%] h-2 animate-pulse rounded-full bg-gray-400"/> <div className="w-[70%] h-2 animate-pulse rounded-full bg-gray-700"/></div>
                                                                        <div className="flex gap-1"><div className="w-[70%] h-2 animate-pulse rounded-full bg-gray-400"/> <div className="w-[30%] h-2 animate-pulse rounded-full bg-gray-700"/></div>
        </div>
    </div>
}