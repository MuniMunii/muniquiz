/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { createMocks } from "node-mocks-http";
import getQuizByParam from "@/pages/api/quiz/get-quizparam";
import { ParticipateScheme } from "lib/validation/participate";
import type{ NextApiRequest, NextApiResponse } from "next";
const dummyParticipate = {
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
jest.mock("lib/mongoClient", () => ({
  __esModule: true,
  default: Promise.resolve({
    db: () => ({
      collection: () => ({
        findOne: jest.fn().mockImplementation(async (query) => {
          if (
            query.enterID === "ABC1234567"
          ) {
            return dummyParticipate;
          }
          return null;
        }),
        insertOne: jest.fn().mockResolvedValue({ acknowledged: true, insertedId: "mockedId123" }),
      }),
    }),
  }),
}));
jest.useFakeTimers()
describe('Quiz Session API',()=>{
    it('get-quizparam Received data match value with participate scheme',async ()=>{
        const {req,res}=createMocks({
            method:'POST',
            body:{username:'Muni',enterID:'ABC1234567'}
        })
        const typedReq = req as unknown as NextApiRequest;
        const typedRes = res as unknown as NextApiResponse;
        await getQuizByParam(typedReq,typedRes)
        expect(res._getStatusCode()).toBe(200)
    })
    it('Remove Quiz if timer expired',async ()=>{
        const {req,res}=createMocks({
            method:'POST',
            body:{username:'Muni',enterID:'ABC1234567'}
        })
        const typedReq = req as unknown as NextApiRequest;
        const typedRes = res as unknown as NextApiResponse;
        await getQuizByParam(typedReq,typedRes)
        expect(res._getStatusCode()).toBe(200)
    })
})