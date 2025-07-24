import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongoClient";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method!=="GET")return res.status(403).json({message:'Only GET method'});
    const {enterID}=req.body
    try{
        const Quiz=(await clientPromise).db('muniquiz').collection('quiz')
        const findOneQuiz=await Quiz.findOne({enterID:enterID})
        res.status(200).json({message:'Success retrived data',data:findOneQuiz})
    }catch(error){return res.status(500).json({message:'Internal server error'})}
}