import { authOptions } from "../../../../lib/authOption";
import { getServerSession } from "next-auth";
export default async function QuizPage ({params}:{params:{slug:string}}){
        const {slug} =await params;
        const session=await getServerSession(authOptions)
        const user=session?.user
        if(!session){
                return 
        }
        return (<div></div>)
}