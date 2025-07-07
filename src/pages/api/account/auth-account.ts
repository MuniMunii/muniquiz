import type { VercelRequest, VercelResponse } from "@vercel/node";
import clientPromise from "../../../../lib/mongoClient";
import bcrypt from 'bcryptjs'
import {z}from 'zod'
const authParsedScheme=z.object({
    username:z.string().min(1),
    password:z.string().min(1)
})
export default async function handler(req:VercelRequest,res:VercelResponse){
    if(req.method!=='POST'){
        return res.status(500).json('only post method')
    }
    const parsedAuth=authParsedScheme.safeParse(req.body)
    if(!parsedAuth.success){
        return res.status(400).json({messages:'Invalid form format',status:true})
    }
    const {username,password}=parsedAuth.data
    try{
        const client=await clientPromise
        const db=client.db('muniquiz')
        const post=db.collection('users')
        const user=await post.findOne({username,provider:'credentials'})
        if(!user||!user.password){
            return res.status(401).json({messages:'Invalid Username or Password'})
        }
        const PassIsMatch=await bcrypt.compare(password,user.password)
        if(!PassIsMatch){
             return res.status(401).json({messages:'Invalid Username or Password'})
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return res.status(200).json(userWithoutPassword)
    }catch(error){
        console.log('auth error',error)
        return res.status(500).json('Auth Error')
    }
}