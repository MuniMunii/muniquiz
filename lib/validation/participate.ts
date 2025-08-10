import {z}from 'zod'
import { CategoryEnum } from './quiz';
export const ProgressQuiz= z.object({
      id:z.string(),
      title: z.string(),
      answer_choice: z.array(
        z.object({
          question_id: z.string(),
          question: z.string().trim().min(1, 'Answer choice title cannot be empty'),
          answer: z.boolean(),
        })
      )
    })
export const ParticipateScheme = z.object({
  id: z.string(),
  username: z.string(),
  played_at: z.union([z.coerce.date(), z.string()]),
  true_answer: z.number(),
  titleQuiz: z.string(),
    enterID:z.string().max(10),
  quiz_category: CategoryEnum,
  progress: z.array(ProgressQuiz),
  expired_at: z.date()
});
export type ProgressQuizType=z.infer<typeof ProgressQuiz>