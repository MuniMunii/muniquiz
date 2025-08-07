import {z} from 'zod'
const CategoryEnum=z.enum(['math','biology','bussiness','tech','other'])
export const AnswerChoiceScheme=z.object({
    question_id:z.string(),
    question:z.string().trim().min(1, 'Answer choice title cannot be empty'),
    answer:z.boolean()
})
export const QuestionScheme=z.object({
    id:z.string(),
    title:z.string().trim().min(1, 'Quiz title cannot be empty'),
    question:z.array(AnswerChoiceScheme).min(2, 'Each quiz must have at least 2 Answer Choice')
})
export const ParticipateScheme=z.object({
    id:z.string(),
    username:z.string(),
    played_at:z.union([z.coerce.date(), z.string()]),
    true_answer:z.number(),
    titleQuiz: z.string(),
    quiz_category: CategoryEnum
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