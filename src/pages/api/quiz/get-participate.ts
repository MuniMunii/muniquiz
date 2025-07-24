import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongoClient";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOption";

export default async function handler (req:NextApiRequest,res:NextApiResponse){
    if(req.method!=='GET')return res.status(405).json({message:'Only get method'});
    const session=await getServerSession(req,res,authOptions)
     if (!session?.user?.username) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try{
        const Participate=(await clientPromise).db('muniquiz').collection('participate')
        const searchingUserParticipateQuiz=await Participate.find({username:session.user.username}).toArray()
        if(searchingUserParticipateQuiz.length===0)return res.status(404).json({message:'Still not participating in any quiz'})
        res.status(200).json({message:'Data Success',data:searchingUserParticipateQuiz})
    }catch(error){return res.status(500).json({messae:'Internal server error'})}
}