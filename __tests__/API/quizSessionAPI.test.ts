/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { createMocks } from "node-mocks-http";
import getQuizByParam from "@/pages/api/quiz/get-quizparam";
import { ParticipateScheme, ParticipateType } from "lib/validation/participate";
import type{ NextApiRequest, NextApiResponse } from "next";
import { OwnerQuizType } from "lib/validation/quiz";
import UpdateProgressIndex from "@/pages/api/quiz/patch-updateProgressIndex";
const dummyQuiz:OwnerQuizType = {
  id: "quiz_12345",
  enterID: "ABC1234567", // max 10 chars
  owner: "muniUser",
  created_At: new Date().toISOString(),
  titleQuiz: "General Knowledge Quiz",
  Quiz: [
    {
      id: "q1",
      title: "What is the capital of France?",
      question: [
        {
          question_id: "q1a1",
          question: "Paris",
          answer: false,
          real_answer: true,
        },
        {
          question_id: "q1a2",
          question: "London",
          answer: false,
          real_answer: false,
        },
      ],
    },
    {
      id: "q2",
      title: "Which planet is known as the Red Planet?",
      question: [
        {
          question_id: "q2a1",
          question: "Mars",
          answer: false,
          real_answer: true,
        },
        {
          question_id: "q2a2",
          question: "Venus",
          answer: false,
          real_answer: false,
        },
      ],
    },
    {
      id: "q3",
      title: "Who wrote 'Hamlet'?",
      question: [
        {
          question_id: "q3a1",
          question: "William Shakespeare",
          answer: false,
          real_answer: true,
        },
        {
          question_id: "q3a2",
          question: "Charles Dickens",
          answer: false,
          real_answer: false,
        },
      ],
    },
  ],
  timer: 60, // seconds
  image: "https://example.com/quiz-image.jpg",
  quiz_category: "other", // from CategoryEnum
};
      const removedReal_answer = dummyQuiz.Quiz.map((val) => {
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
          (dummyQuiz!.timer === 0
            ? 24 * 60 * 60 * 1000
            : dummyQuiz!.timer * 1000)
      );
      const reconstructQuiz: ParticipateType = {
        id: dummyQuiz.id,
        titleQuiz: dummyQuiz.titleQuiz,
        username: "MuniMuni Participate",
        quiz_category: dummyQuiz.quiz_category,
        enterID: dummyQuiz.enterID,
        progress: removedReal_answer,
        progressIndex:1,
        played_at: new Date(),
        expired_at: timer,
      };
jest.mock("lib/mongoClient", () => ({
  __esModule: true,
  default: Promise.resolve({
    db: () => ({
      collection: () => ({
        findOne: jest.fn().mockImplementation(async (query) => {
          if (
            query.enterID === "ABC1234567"
          ) {
            return reconstructQuiz;
          }
          return null;
        }),
        insertOne: jest.fn().mockResolvedValue({ acknowledged: true, insertedId: "mockedId123" }),
        updateOne: jest.fn().mockResolvedValue({ acknowledged: true, modifiedCount: 1 }),
      }),
    }),
  }),
}));
jest.useFakeTimers()
describe('Quiz Session API',()=>{
    // it('Remove Quiz if timer expired',async ()=>{
    //     const {req,res}=createMocks({
    //         method:'POST',
    //         body:{username:'MuniMuni Participate',enterID:'ABC1234567'}
    //     })
    //     const typedReq = req as unknown as NextApiRequest;
    //     const typedRes = res as unknown as NextApiResponse;
    //     // act()
    //     await getQuizByParam(typedReq,typedRes)
    //     expect(res._getStatusCode()).toBe(200)
    // })
    it('Updating Progress Index',async()=>{
      const {req,res}=createMocks({
        method:'PATCH',
        body:{username:'MuniMuni Participate',enterID:'ABC1234567',index:2}
      })
      const typedReq = req as unknown as NextApiRequest;
      const typedRes = res as unknown as NextApiResponse;
      await UpdateProgressIndex(typedReq,typedRes)
      expect(res._getStatusCode()).toBe(200)
    })
        it('Fallback if session not found',async()=>{
      const {req,res}=createMocks({
        method:'PATCH',
        body:{username:'MuniMuni Participateasd',enterID:'ABC1234567asdas',index:2}
      })
      const typedReq = req as unknown as NextApiRequest;
      const typedRes = res as unknown as NextApiResponse;
      await UpdateProgressIndex(typedReq,typedRes)
      expect(res._getStatusCode()).toBe(404)
    })
})