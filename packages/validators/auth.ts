import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const emailSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, { message: 'Token is required' }),
    newPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(100, { message: 'Password must be less than 100 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password don't match",
    path: ['confirmPassword'],
  });

export const signInGoogleSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  image: z.string().nullable().optional(),
  accounts: z.object({
    type: z.string(),
    provider: z.string(),
    providerAccountId: z.string(),
    refresh_token: z.string().nullable().optional(),
    access_token: z.string().nullable().optional(),
    expires_at: z.number().nullable().optional(),
    token_type: z.string().nullable().optional(),
    scope: z.string().nullable().optional(),
    id_token: z.string().nullable().optional(),
    session_state: z.string().nullable().optional(),
  }),
});
