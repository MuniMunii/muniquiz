import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongoClient";
import bcrypt from 'bcryptjs';
import {z} from 'zod'
const RegisterUserScheme=z.object({
    username:z.string().min(3).max(20).trim(),
    email:z.string().email().trim(),
    password:z.string().min(6)
})
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method!=='POST'){
        return res.status(500).json('only post method')
    }
    const parseResult=RegisterUserScheme.safeParse(req.body)
    if(!parseResult.success){
        return res.status(400).json({error:"Username, email, and password are required/Invalid",status:true});
    }
    const {username,email,password}=parseResult.data;
    try {
        const client = await clientPromise;
        const db =client.db("muniquiz")
        const posts=db.collection("users")
        const userExist=await posts.findOne({$or:[{email},{username}]})
        const hash=await bcrypt.hash(password,10)
        if(userExist){
            return res.status(409).json({message:'Account with this Username/Email is already exist',status:true})
        }
        await posts.insertOne({
            username,
            email,
            password:hash,
            createdAt:new Date(),
            image:null,
            role:'user',
            provider: "credentials"
        })
        return res.status(201).json({message:"Account created successfully",status:true});
    } catch (error) {
        console.error("Error creating account:", error);
        return res.status(500).json({error:"Internal server error",status:true});
    }
}