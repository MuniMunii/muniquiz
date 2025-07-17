import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { v4 as uuid } from "uuid";
import { nanoid } from "nanoid";

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
          {question_id:nanoid(12), question: 'What is 2 + 2?', answer: true },
          {question_id:nanoid(12), question: 'Is the Earth flat?', answer: false },
        ],
      },
    ],
    // add quiz
    addQuiz: () =>
      set((state) => {
        state.quizzes.push({
          id: nanoid(12),
          title: 'Title Question',
          question: [{question_id:nanoid(12),question: 'Question 1', answer: true },{question_id:nanoid(12),question: 'Question 2', answer: false }],
        });
      }),
// remove quiz
// this take quiz index to detect position of quiz and delete the quiz
    removeQuiz: (quizIndex) =>
      set((state) => {
        state.quizzes.splice(quizIndex, 1);
      }),
// add Question in quiz object
// this take quiz index to detect position of quiz to add the question/answer
    addQuestion: (quizIndex) =>
      set((state) => {
        state.quizzes[quizIndex].question.push({
          question_id:nanoid(12),
          question: `Question ${state.quizzes[quizIndex].question.length+1}`,
          answer: false,
        });
      }),
// remove question in quiz
// this take quiz index and question index as parameter to detect the value of quiz and delete the value
    removeQuestion: (quizIndex, questionIndex) =>
      set((state) => {
        state.quizzes[quizIndex].question.splice(questionIndex, 1);
      }),
// update title of quiz
// this take quiz index as parameter and newtext to change the title name
    updateTitle: (quizIndex, newTitle) =>
      set((state) => {
        state.quizzes[quizIndex].title = newTitle;
      }),
// update question inside quiz return newtext
// this take quiz index and question index as parameter and newtext to change the question name
    updateQuestion: (quizIndex, questionIndex, newText) =>
      set((state) => {
        state.quizzes[quizIndex].question[questionIndex].question = newText;
      }),
// toggle answer return boolean in question inside quiz
// this take quiz index and question index as parameter to detect the value of quiz
    toggleAnswer: (quizIndex, questionIndex) =>
      set((state) => {
        state.quizzes[quizIndex].question.forEach((q,i)=>{q.answer=i===questionIndex})
      }),
  })
));
