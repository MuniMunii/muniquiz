import type { VercelRequest, VercelResponse } from '@vercel/node';
import { allowCors } from '../../../lib/allowCors';
import clientPromise from '../../../lib/mongoClient';
async function handler(_req: VercelRequest, res: VercelResponse) {
    try{
        const client = await clientPromise;
        const db =client.db("sample_mflix")
        const posts=db.collection("movies")
        const getMovies=await posts.find().limit(2).toArray()
        res.status(200).json({ message: "Test endpoint is working!" ,Movie:getMovies});
    }
    catch(error){
        console.error("Error in /test endpoint:", error);
        res.status(500).json({ error: "Internal Server Error",messages:error });
    }
}
export default allowCors(handler)