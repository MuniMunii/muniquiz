// import { create } from "zustand";
// // import { v4 as uuid } from "uuid";
// interface QuizQuestion {
//   question: string;
//   answer: boolean;
// }
// interface Quiz {
//   id: string;
//   title: string;
//   question: QuizQuestion[];
// }
// interface QuizStore {
//   quizzes: Quiz[];
//   addQuiz: () => void;
//   removeQuiz: (quizIndex: number) => void;
//   addQuestion: (quizIndex: number) => void;
//   removeQuestion: (quizIndex: number, questionIndex: number) => void;
//   updateTitle: (quizIndex: number, newTitle: string) => void;
//   updateQuestion: (quizIndex: number, questionIndex: number, newText: string) => void;
//   toggleAnswer: (quizIndex: number, questionIndex: number) => void;
// }
// export const useQuizStore = create<QuizStore>((set) => ({
//     // Initial state
//   quizzes:[{
//       id: uuid(),
//       title: 'Sample Quiz',
//       question: [
//         { question: 'What is 2 + 2?', answer: true },
//         { question: 'Is the Earth flat?', answer: false },
//       ],
//     },],
//     // state add quiz
//   addQuiz: () =>
//     set((state) => ({
//       quizzes: [
//         ...state.quizzes,
//         { id: uuid(), title: "", question: [{ question: "", answer: false }] },
//       ],
//     })),
//     // State remove quiz
//       removeQuiz: (quizIndex) =>
//     set((state) => {
//       const updated = [...state.quizzes];
//       updated.splice(quizIndex, 1);
//       return { quizzes: updated };
//     }),
//     // state add question inside quiz object
//   addQuestion: (quizIndex) =>
//     set((state) => {
//       const updated = [...state.quizzes];
//       const quiz = updated[quizIndex];
//       quiz.question.push({ question: '', answer: false });
//       return { quizzes: updated };
//     }),
//     // state remove question inside quiz object
//   removeQuestion: (quizIndex, questionIndex) =>
//     set((state) => {
//       const updated = [...state.quizzes];
//       const quiz = updated[quizIndex];
//       quiz.question.splice(questionIndex, 1);
//       return { quizzes: updated };
//     }),
//     // state update title of quiz 
//   updateTitle: (quizIndex, newTitle) =>
//     set((state) => {
//       const updated = [...state.quizzes];
//       updated[quizIndex] = { ...updated[quizIndex], title: newTitle };
//       return { quizzes: updated };
//     }),
//     // state update question inside quiz object
//   updateQuestion: (quizIndex, questionIndex, newText) =>
//     set((state) => {
//       const updated = [...state.quizzes];
//       const Quiz = updated[quizIndex];
//       const updatedQuestion = [...Quiz.question];
//       updatedQuestion[questionIndex] = {
//         ...updatedQuestion[questionIndex],
//         question: newText,
//       };
//       updated[quizIndex] = { ...Quiz, question: updatedQuestion };
//       return { quizzes: updated };
//     }),
//     // state toggle answer question inside quiz object
//   toggleAnswer: (quizIndex, questionIndex) =>
//     set((state) => {
//       const updated = [...state.quizzes];
//       const quiz = updated[quizIndex];
//       const updatedQuestion = [...quiz.question];
//       updatedQuestion[questionIndex].answer =
//         !updatedQuestion[questionIndex].answer;
//       updated[quizIndex] = { ...quiz, question: updatedQuestion };
//       return { quizzes: updated };
//     }),
// }));
