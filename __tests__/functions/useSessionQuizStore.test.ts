/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { useSessionQuizStore } from "@/app/quiz/[slug]/[username]/store/SessionQuizStore";
import cloneDeep from "lodash.clonedeep";
import { OwnerQuizType } from "lib/validation/quiz";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { ParticipateType, ProgressQuizType } from "lib/validation/participate";
// jest.mock("nanoid", () => {
//   let counter = 0;
//   return {
//     nanoid: () => `mock-nano-id-${counter++}`,
//   };
// });
const dummyQuiz: OwnerQuizType = {
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
const server = setupServer(
  http.post("/api/quiz/get-quizparam", async ({ request }) => {
    const body = await request.clone().json();
    if (body?.enterID === "ABC1234567") {
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
      return HttpResponse.json({
        message: "successfull fetching",
        data: reconstructQuiz,
      });
    }
    return HttpResponse.json({ message: "Quiz Not found" });
  })
);
function snapshotAsnwerState() {
  return cloneDeep(useSessionQuizStore.getState().answerState);
}
function snapshotQuizState() {
  return cloneDeep(useSessionQuizStore.getState().QuizState);
}
describe("useSessionQuiz Store Zustand", () => {
  beforeEach(() => {
    useSessionQuizStore.setState({
      answerState: [],
      QuizState: null,
    });
    server.listen();
  });
  afterEach(() => {
    useSessionQuizStore.setState({
      answerState: [],
      QuizState: null,
    });
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
  it("Set Quiz into QuizState", async () => {
    const before = snapshotQuizState();
    expect(before).toBeNull();
    const response = await fetch("/api/quiz/get-quizparam", {
      method: "POST",
      body: JSON.stringify({ enterID: "ABC1234567" }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    useSessionQuizStore.setState({ QuizState: data.data });
    const after = snapshotQuizState();
    expect(after).not.toBeNull();
  });
  it("Set Quiz Question into AnswerState Progress", async () => {
    const before = snapshotAsnwerState();
    expect(before.length).not.toBeGreaterThan(0);
    const response = await fetch("/api/quiz/get-quizparam", {
      method: "POST",
      body: JSON.stringify({ enterID: "ABC1234567" }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    const AnswerList = data.data.progress;
    useSessionQuizStore.getState().addAnswer(AnswerList);
    const after = snapshotAsnwerState();
    expect(after.length).toBeGreaterThan(0);
  });
  it("Toggle Answer in AnswerState Progress and only one that has true value", async () => {
    const response = await fetch("/api/quiz/get-quizparam", {
      method: "POST",
      body: JSON.stringify({ enterID: "ABC1234567" }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    const AnswerList = data.data.progress;
    useSessionQuizStore.getState().addAnswer(AnswerList);
    const before = snapshotAsnwerState();
    expect(before[1].answer_choice[1].answer).toBe(false);
    useSessionQuizStore.getState().toggleAnswer(1, 1);
    const after = snapshotAsnwerState();
    expect(after[1].answer_choice[1].answer).toBe(true);
    after.forEach((el) => {
      const trueAnswers = el.answer_choice.filter((an) => an.answer).length;
      expect(trueAnswers).toBeLessThanOrEqual(1);
    });
  });
});
