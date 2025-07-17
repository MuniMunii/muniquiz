import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongoClient";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOption";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });
  if (req.method !== "GET")
    return res.status(500).json({ message: "Method get only" });
  try {
    const Quiz = (await clientPromise).db("muniquiz").collection("quiz");
    const searchQuiz = await Quiz.find({ owner: session?.user.username })
      .sort({ created_at: -1 })
      .toArray();
    res.status(200).json({ message: "Get Success", data: searchQuiz });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server internal error,try again", error });
  }
}
