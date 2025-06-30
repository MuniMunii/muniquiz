import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        return res.status(400).json({error:"Username, email, and password are required.",status:false});
    }
    try {
        console.log("Account created:", { username, email, password });
        return res.status(201).json({message:"Account created successfully",status:true});
    } catch (error) {
        console.error("Error creating account:", error);
        return res.status(500).json({error:"Internal server error",status:false});
    }
}