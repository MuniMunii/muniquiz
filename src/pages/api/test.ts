import type { VercelRequest, VercelResponse } from '@vercel/node';
import { allowCors } from '../lib/allowCors';

async function handler(_req: VercelRequest, res: VercelResponse) {
    try{
        console.log("test")
        res.status(200).json({ message: "Test endpoint is working!" });
    }
    catch(error){
        console.error("Error in /test endpoint:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
export default allowCors(handler)