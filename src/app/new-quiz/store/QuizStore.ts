import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { v4 as uuid } from "uuid";
import { nanoid } from "nanoid";

interface QuizQuestion {
  question_id?: string;
  question: string;
  answer: boolean;
}

interface Quiz {
  id: string;
  title: string;
  questionCounter?: number;
  question: QuizQuestion[];
}

/**
 * Zustand store interface for managing quizzes and their questions.
 */
interface QuizStore {
  quizzes: Quiz[];
  /**
   * Add a new empty quiz to the list.
   */
  addQuiz: () => void;
  /**
   * Remove a quiz by index.
   * @param quizIndex - The index of the quiz to remove.
   */
  removeQuiz: (quizIndex: number) => void;
  /**
   * Add a new question to a specific quiz.
   * @param quizIndex - The index of the quiz to which the question will be added.
   */
  addQuestion: (quizIndex: number) => void;
  /**
   * Remove a question from a quiz.
   * @param quizIndex - The index of the quiz.
   * @param questionIndex - The index of the question to remove.
   */
  removeQuestion: (quizIndex: number, questionIndex: number) => void;
  /**
   * Update the title of a quiz.
   * @param quizIndex - The index of the quiz.
   * @param newTitle - The new title string.
   */
  updateTitle: (quizIndex: number, newTitle: string) => void;
  /**
   * Update the text of a question.
   * @param quizIndex - The index of the quiz.
   * @param questionIndex - The index of the question to update.
   * @param newText - The new question text.
   */
  updateQuestion: (
    quizIndex: number,
    questionIndex: number,
    newText: string
  ) => void;
  /**
   * Toggle the selected answer state for a question.
   * @param quizIndex - The index of the quiz.
   * @param questionIndex - The index of the question to toggle.
   */
  toggleAnswer: (quizIndex: number, questionIndex: number) => void;
  /**
   * Reset the entire quiz store to initial state.
   */
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizStore>()(
  immer((set) => ({
    // default value
    quizzes: [
      {
        id: uuid(),
        title: "Sample Quiz",
        question: [
          { question_id: nanoid(12), question: "What is 2 + 2?", answer: true },
          {
            question_id: nanoid(12),
            question: "Is the Earth flat?",
            answer: false,
          },
        ],
      },
    ],
    // add quiz
    addQuiz: () =>
      set((state) => {
        state.quizzes.push({
          id: nanoid(12),
          title: "",
          question: [
            { question_id: nanoid(12), question: "", answer: true },
            { question_id: nanoid(12), question: "", answer: false },
          ],
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
        const quiz = state.quizzes[quizIndex];
        quiz.questionCounter = quiz.question.length + 1;
        quiz.question.push({
          question_id: nanoid(12),
          question: ``,
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
        state.quizzes[quizIndex].question.forEach((q, i) => {
          q.answer = i === questionIndex;
        });
      }),
    // Reset State
    resetQuiz: () =>
      set((state) => {
        state.quizzes = [
          {
            id: uuid(),
            title: "Sample Quiz",
            question: [
              {
                question_id: nanoid(12),
                question: "What is 2 + 2?",
                answer: true,
              },
              {
                question_id: nanoid(12),
                question: "Is the Earth flat?",
                answer: false,
              },
            ],
          },
        ];
      }),
  }))
);
