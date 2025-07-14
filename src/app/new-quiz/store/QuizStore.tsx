import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { v4 as uuid } from "uuid";

interface QuizQuestion {
  question_id?:string;
  question: string;
  answer: boolean;
}

interface Quiz {
  id: string;
  title: string;
  question: QuizQuestion[];
}

interface QuizStore {
  quizzes: Quiz[];
  addQuiz: () => void;
  removeQuiz: (quizIndex: number) => void;
  addQuestion: (quizIndex: number) => void;
  removeQuestion: (quizIndex: number, questionIndex: number) => void;
  updateTitle: (quizIndex: number, newTitle: string) => void;
  updateQuestion: (quizIndex: number, questionIndex: number, newText: string) => void;
  toggleAnswer: (quizIndex: number, questionIndex: number) => void;
}

export const useQuizStore = create<QuizStore>()(
  immer((set) => ({
    // default value
    quizzes: [
      {
        id: uuid(),
        title: 'Sample Quiz',
        question: [
          {question_id:uuid(), question: 'What is 2 + 2?', answer: true },
          {question_id:uuid(), question: 'Is the Earth flat?', answer: false },
        ],
      },
    ],
    // add quiz
    addQuiz: () =>
      set((state) => {
        state.quizzes.push({
          id: uuid(),
          title: 'Title Question',
          question: [{ question: 'Question 1', answer: true },{ question: 'Question 2', answer: false }],
        });
      }),
// remove quiz
    removeQuiz: (quizIndex) =>
      set((state) => {
        state.quizzes.splice(quizIndex, 1);
      }),
// add Question in quiz object
    addQuestion: (quizIndex) =>
      set((state) => {
        state.quizzes[quizIndex].question.push({
          question_id:uuid(),
          question: `Question ${state.quizzes[quizIndex].question.length+1}`,
          answer: false,
        });
      }),
// remove question in quiz
    removeQuestion: (quizIndex, questionIndex) =>
      set((state) => {
        state.quizzes[quizIndex].question.splice(questionIndex, 1);
      }),
// update title of quiz
    updateTitle: (quizIndex, newTitle) =>
      set((state) => {
        state.quizzes[quizIndex].title = newTitle;
      }),
// update question inside quiz return newtext
    updateQuestion: (quizIndex, questionIndex, newText) =>
      set((state) => {
        state.quizzes[quizIndex].question[questionIndex].question = newText;
      }),
// toggle answer return boolean in question inside quiz
    toggleAnswer: (quizIndex, questionIndex) =>
      set((state) => {
        state.quizzes[quizIndex].question.forEach((q,i)=>{q.answer=i===questionIndex})
      }),
  })
));
