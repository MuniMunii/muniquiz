/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { useQuizStore } from "@/app/new-quiz/store/QuizStore";
import cloneDeep from "lodash.clonedeep";

jest.mock("nanoid", () => {
  let counter = 0;
  return {
    nanoid: () => `mock-nano-id-${counter++}`,
  };
});
  function snapshotQuizzes() {
  return cloneDeep(useQuizStore.getState().quizzes);
}
describe("UseQuiz Store Zustand", () => {
  // give default value
  beforeEach(() => {
    useQuizStore.setState({
      quizzes: [
        {
          id: "adsasdasdasd",
          title: "Sample Quiz",
          question: [
            {
              question_id: "ksksksdw",
              question: "What is 2 + 2?",
              answer: false,
              real_answer: true,
            },
            {
              question_id: "sdasdasd",
              question: "Is the Earth flat?",
              answer: false,
              real_answer: false,
            },
          ],
        },
      ],
    });
  });
  //   Reset array
  afterEach(() => {
    useQuizStore.setState({ quizzes: [] });
  });

  it("Default Quiz not empty", () => {
    const { quizzes } = useQuizStore.getState();
    expect(quizzes.length).toBeGreaterThan(0);
  });
//   Add quiz question test
  it("Added Quiz Question", () => {
    const { addQuiz } = useQuizStore.getState();
    const prevQuiz = useQuizStore.getState().quizzes.length;
    addQuiz();
    const newQuizLength = useQuizStore.getState().quizzes.length;
    expect(newQuizLength).toBe(prevQuiz + 1);
  });
  //   Remove quiz question test
  it("Remove Quiz Question", () => {
    const { addQuiz, removeQuiz } = useQuizStore.getState();
    // act add quiz
    addQuiz();
    // make a copy of quizzez
    const prevQuiz = [...useQuizStore.getState().quizzes];
    // check if quiz added
    expect(prevQuiz.length).toBeGreaterThan(0);
    // act delete quiz
    removeQuiz(0);
    // assert check after deleted
    const afterQuiz = useQuizStore.getState().quizzes;
    expect(afterQuiz.length).toBe(prevQuiz.length - 1);
    expect(() =>
      useQuizStore.getState().quizzes.find((q) => q.id === prevQuiz[0].id)
    );
  });
//   add answer choice test
  it("Add Answer Choice", () => {
    const { addQuiz, addAnswerChoice } = useQuizStore.getState();
    addQuiz();
    const prevQuiz = [...useQuizStore.getState().quizzes[1].question].length;
    addAnswerChoice(1);
    const afterQuizAnswerQuestion =
      useQuizStore.getState().quizzes[1].question.length;
    expect(afterQuizAnswerQuestion).toEqual(prevQuiz + 1);
  });
//   remove answer choice test
  it("Remove Answer Choice",()=>{
    const {addQuiz,addAnswerChoice,removeAnswerChoice}=useQuizStore.getState();
        addQuiz();
        addAnswerChoice(1);
        const before=snapshotQuizzes()
        removeAnswerChoice(1,1)
        const after = useQuizStore.getState().quizzes;
        expect(after[1].question.length).toBe(before[1].question.length-1)
        expect(after[1].question.find((a)=>a.question_id===before[1].question[1].question_id)).toBeUndefined()
  })
//   toggle answer choice test
  it("Toggle Answer Choice",()=>{
        const {addQuiz,addAnswerChoice,toggleAnswer}=useQuizStore.getState();
        addQuiz()
        addAnswerChoice(1)
        const before=snapshotQuizzes()
        toggleAnswer(1,1)
        const after=useQuizStore.getState().quizzes
        expect(after[1].question[1].real_answer).toBe(before[1].question[1].real_answer!==after[1].question[1].real_answer)
  })
});
