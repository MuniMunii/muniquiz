import * as z from 'zod';

export const CredentialsUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(1),
  password: z.string().min(1),
  role: z.string(),
  createdAt: z.coerce.date().optional(),
});
export const GoogleUserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  image: z.string().optional(),
  role: z.string().default('user'),
  emailVerified: z.union([z.date(), z.null()]).optional(),
  provider: z.string().optional(),
  createdAt: z.union([z.coerce.date(), z.string()]).optional(),
});

export type CredentialsUser = z.infer<typeof CredentialsUserSchema>;
export type GoogleUser = z.infer<typeof GoogleUserSchema>;