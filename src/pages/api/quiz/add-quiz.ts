import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongoClient";
import { OwnerQuizScheme } from "../../../../lib/validation/quiz";
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method!=='POST'){return res.status(500).json({message:'only post method'})}
    const parsedBody=OwnerQuizScheme.safeParse(req.body)
    if(!parsedBody.success){
        return res.status(403).json({message:'All input must be filled',errors: parsedBody.error.flatten().fieldErrors})
    }
    res.status(200).json({message:'Parse Success'})
    const Quiz=(await (clientPromise)).db('muniquiz').collection('quiz')
}