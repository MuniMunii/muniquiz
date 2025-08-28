import {z}from 'zod'
import { CategoryEnum } from './quiz';
export const ProgressQuizScheme= z.object({
      id:z.string(),
      title: z.string(),
      answer_choice: z.array(
        z.object({
          question_id: z.string(),
          answer_question: z.string().trim().min(1, 'Answer choice title cannot be empty'),
          answer: z.boolean(),
        })
      )
    })
export const ParticipateScheme = z.object({
  id: z.string(),
  username: z.string(),
  played_at: z.union([z.coerce.date(), z.string()]),
  titleQuiz: z.string(),
  enterID:z.string().max(10),
  quiz_category: CategoryEnum,
  progress: z.array(ProgressQuizScheme),
  progressIndex:z.number(),
  expired_at: z.date(),
  timer:z.date().optional(),
}); 
export type ProgressQuizType=z.infer<typeof ProgressQuizScheme>
export type ParticipateType=z.infer<typeof ParticipateScheme>