import {z} from 'zod'
export const QuestionScheme=z.object({
    question_id:z.string(),
    question:z.string().trim().min(1, 'Question title cannot be empty'),
    answer:z.boolean()
})
export const QuizScheme=z.object({
    id:z.string(),
    title:z.string().trim().min(1, 'Quiz title cannot be empty'),
    question:z.array(QuestionScheme).min(1, 'Each quiz must have at least 1 question')
})
export const OwnerQuizScheme=z.object({
    id:z.string(),
    owner:z.string(),
    created_At:z.union([z.coerce.date(), z.string()]),
    titleQuiz:z.string().trim().min(1, 'Title cannot be empty'),
    // nanti di ganti sesuai kebutuhan
    Quiz:z.array(QuizScheme).min(1, 'There must be at least 3 quiz'),
    participate:z.array(z.any())
})
export type OwnerQuizType=z.infer<typeof OwnerQuizScheme>
export type QuestionType=z.infer<typeof QuestionScheme>
export type QuizType=z.infer<typeof QuizScheme>