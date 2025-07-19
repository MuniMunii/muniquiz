import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongoClient";
import { OwnerQuizScheme,QuizScheme } from "../../../../lib/validation/quiz";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOption";
import { v4 as uuid } from "uuid";
import { nanoid } from "nanoid";
import {z}from 'zod'
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method!=='POST'){return res.status(500).json({message:'only post method'})}
    const session=await getServerSession(req, res, authOptions)
    console.log(session)
    const parsedBody=z.array(QuizScheme).safeParse(req.body.Quiz)
    console.log(parsedBody.data)
    if(!parsedBody.success){
        return res.status(403).json({message:'All input must be filled',status:true,errors: parsedBody.error})
    }
    try{
    const Quiz=(await (clientPromise)).db('muniquiz').collection('quiz')
    // console.log('Session:', session);
        const ReconstructData = 
      {
        id: uuid(),
        enterID:nanoid(10),
        owner: session?.user.username,
        created_At: new Date(),
        category:req.body.category,
        timer:req.body.timer,
        titleQuiz:req.body.titleQuiz,
        image:req.body.image,
        Quiz:parsedBody.data,
        participate:[],
      }
      const ownerValidation = OwnerQuizScheme.safeParse(ReconstructData);
if (!ownerValidation.success) {
    return res.status(400).json({ message: 'Quiz validation failed, Please try again', errors: ownerValidation.error,status:true });
}
    await Quiz.insertOne(ReconstructData)
        res.status(200).json({message:'Quiz Successfully added',status:true,enterID:ReconstructData.enterID})
    }catch(error){return res.status(500).json({message:'Server error try again',status:true,error:error})}
}