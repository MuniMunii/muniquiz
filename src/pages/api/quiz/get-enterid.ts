import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongoClient";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method!=='POST'){return res.status(405).json({message:'Only POST Method'})}
    const {enterID}=req.body
    if (!enterID) {
        return res.status(400).json({ message: 'enterID is required', status: true });
    }
    try{
        const Quiz=(await clientPromise).db('muniquiz').collection('quiz')
        const findQuizByEnterId=await Quiz.findOne({enterID:enterID})
        if(!findQuizByEnterId)return res.status(404).json({message:'ID not found',status:true})
        const enterIDRes=findQuizByEnterId?.enterID 
        res.status(200).json({message:'successfull',status:true,enterID:enterIDRes})
    }catch(err){return res.status(500).json({message:'Server Error Try Again'+err,status:true})}
}