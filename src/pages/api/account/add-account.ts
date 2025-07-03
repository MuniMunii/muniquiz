import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongoClient";
import bcrypt from 'bcryptjs';
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method!=='POST'){
        return res.status(500).json('only post method')
    }
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        return res.status(400).json({error:"Username, email, and password are required.",status:false});
    }
    try {
        const client = await clientPromise;
        const db =client.db("muniquiz")
        const posts=db.collection("users")
        const userExist=await posts.findOne({$or:[{email},{username}]})
        const hash=await bcrypt.hash(password,10)
        if(userExist){
            return res.status(409).json({messages:'Account with this Username/Email is already exist',status:false})
        }
        await posts.insertOne({
            username,
            email,
            password:hash,
            createdAt:new Date(),
            role:'user',
            provider: "credentials"
        })
        console.log("Account created:", { username, email, password });
        return res.status(201).json({message:"Account created successfully",status:true});
    } catch (error) {
        console.error("Error creating account:", error);
        return res.status(500).json({error:"Internal server error",status:false});
    }
}