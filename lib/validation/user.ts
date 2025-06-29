import * as z from 'zod';
export const UserSchema=z.object({
    role:z.string(),
    email:z.string().email(),
    name:z.string(),
    image:z.string().optional()
})
export type User = z.infer<typeof UserSchema>