import {z} from 'zod'
export const CategoryEnum=z.enum(['math','biology','bussiness','tech','other'])
export const AnswerChoiceScheme=z.object({
    question_id:z.string(),
    question:z.string().trim().min(1, 'Answer choice title cannot be empty'),
    answer:z.boolean(),
    real_answer:z.boolean()
})
export const QuestionScheme=z.object({
    id:z.string(),
    title:z.string().trim().min(1, 'Quiz title cannot be empty'),
    question:z.array(AnswerChoiceScheme).min(2, 'Each quiz must have at least 2 Answer Choice')
})
export const OwnerQuizScheme=z.object({
    id:z.string(),
    enterID:z.string().max(10),
    owner:z.string(),
    created_At:z.union([z.coerce.date(), z.string()]),
    titleQuiz:z.string().trim().min(1, 'Title cannot be empty'),
    // nanti di ganti sesuai kebutuhan
    Quiz:z.array(QuestionScheme).min(3, 'There must be at least 3 quiz'),
    timer:z.number(),
    image:z.string(),
    quiz_category:CategoryEnum.default('other'),
})
export type OwnerQuizType=z.infer<typeof OwnerQuizScheme>
export type AnswerChoiceType=z.infer<typeof AnswerChoiceScheme>
export type QuestionType=z.infer<typeof QuestionScheme>
// Dummy Object
// {
//   id: "quiz_12345",
//   enterID: "ABC1234567", // max 10 chars
//   owner: "muniUser",
//   created_At: new Date().toISOString(),
//   titleQuiz: "General Knowledge Quiz",
//   Quiz: [
//     {
//       id: "q1",
//       title: "What is the capital of France?",
//       question: [
//         {
//           question_id: "q1a1",
//           question: "Paris",
//           answer: false,
//           real_answer: true,
//         },
//         {
//           question_id: "q1a2",
//           question: "London",
//           answer: false,
//           real_answer: false,
//         },
//       ],
//     },
//     {
//       id: "q2",
//       title: "Which planet is known as the Red Planet?",
//       question: [
//         {
//           question_id: "q2a1",
//           question: "Mars",
//           answer: false,
//           real_answer: true,
//         },
//         {
//           question_id: "q2a2",
//           question: "Venus",
//           answer: false,
//           real_answer: false,
//         },
//       ],
//     },
//     {
//       id: "q3",
//       title: "Who wrote 'Hamlet'?",
//       question: [
//         {
//           question_id: "q3a1",
//           question: "William Shakespeare",
//           answer: false,
//           real_answer: true,
//         },
//         {
//           question_id: "q3a2",
//           question: "Charles Dickens",
//           answer: false,
//           real_answer: false,
//         },
//       ],
//     },
//   ],
//   timer: 60, // seconds
//   image: "https://example.com/quiz-image.jpg",
//   quiz_category: "other", // from CategoryEnum
// };