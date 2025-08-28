import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongoClient";
import { getServerSession } from "next-auth";
import { authOptions } from "lib/authOption";
// fix bug when its already in session user cannot create another quiz but continue the quiz that still exist
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method!=='POST')return res.status(405).json({message:'Only Post Method'})
        const {username,enterID,expired_at,guest}=req.body
    try{
    const session=await getServerSession(req,res,authOptions)
    if(session?.user.username!==username){return res.status(404).json({message:'Access forbidden'})}
    const Participate=(await clientPromise).db('muniquiz').collection('participate')
    const findQuiz=await Participate.findOne({username:username,enterID:enterID,expired_at: { $exists: true }})
    if(!findQuiz)return res.status(404).json({message:'Active Session not found'})
        res.status(200).json({message:'Session found',quiz:findQuiz})
}catch(err){return res.status(500).json({message:'Internal server error'})}
}