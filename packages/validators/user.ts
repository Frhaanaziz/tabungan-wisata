import { z } from 'zod';

export enum UserRole {
  admin,
  student,
  teacher,
}

export const userSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1).max(190),
  email: z.string().email().max(190),
  password: z.string().min(6).max(190).nullable(),
  role: z.nativeEnum(UserRole),
  balance: z.number().int().min(0),
  schoolId: z.string().cuid().nullable(),
  emailVerified: z.boolean(),
  image: z.string().url().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
