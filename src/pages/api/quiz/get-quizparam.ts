import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongoClient";
import { OwnerQuizScheme } from "lib/validation/quiz";
import { ParticipateScheme, ParticipateType } from "lib/validation/participate";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(403).json({ message: "Only POST method" });
  const { enterID, username } = req.body;
  try {
    const DB = (await clientPromise).db("muniquiz");
    const findOneQuiz = await DB.collection("quiz").findOne({
      enterID: enterID,
    });
    const isThisUserPlayedAlready=await DB.collection('participate').findOne({username:username,enterID:enterID})
    if(isThisUserPlayedAlready)return res.status(406).json({message:'User Already Played'})
    if (!findOneQuiz) {
      return res.status(404).json({ message: "Quiz Not Found" });
    }
    const parsedQuiz = OwnerQuizScheme.safeParse(findOneQuiz);
    if (!parsedQuiz.success) {
      return res
        .status(400)
        .json({
          message: "Invalid quiz payload",
          error: parsedQuiz.error.format(),
        });
    }
    const removedReal_answer = parsedQuiz.data?.Quiz.map((val) => {
      const answer_choice = val.question.map((qa) => {
        return {
          question_id: qa.question_id,
          answer_question: qa.question,
          answer: qa.answer,
        };
      });
      return {
        id: val.id,
        title: val.title,
        answer_choice,
      };
    });
    const timer = new Date(
      Date.now() +
        (parsedQuiz.data!.timer === 0
          ? 24 * 60 * 60 * 1000
          : parsedQuiz.data!.timer * 1000)
    );
    const reconstructQuiz:ParticipateType = {
      id: parsedQuiz.data?.id,
      titleQuiz: parsedQuiz.data?.titleQuiz,
      username: username,
      quiz_category: parsedQuiz.data?.quiz_category,
      enterID: parsedQuiz.data?.enterID,
      progress: removedReal_answer,
      progressIndex:1,
      played_at: new Date(),
      expired_at: timer,
    };
    const parsedReconstructQuiz = ParticipateScheme.safeParse(reconstructQuiz);
    if (!parsedReconstructQuiz.success)
      return res
        .status(400)
        .json({
          message: "parse failed",
          error: parsedReconstructQuiz.error.format(),
        });
    await DB.collection("participate").insertOne(parsedReconstructQuiz.data);
    res
      .status(200)
      .json({
        message: "Success retrived data",
        data: parsedReconstructQuiz.data,
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" + error });
  }
}
