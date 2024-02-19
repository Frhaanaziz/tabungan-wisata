import { z } from 'zod';

export enum UserRole {
  admin = 'admin',
  student = 'student',
  teacher = 'teacher',
}

export const userSchema = z.object({
  id: z.string().cuid(),
  name: z
    .string()
    .min(1, { message: 'Name must be at least 1 character long' })
    .max(190, { message: 'Name must not exceed 190 characters' }),
  email: z
    .string()
    .email({ message: 'Invalid email format' })
    .max(190, { message: 'Email must not exceed 190 characters' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(190, { message: 'Password must not exceed 190 characters' })
    .nullable(),
  role: z.nativeEnum(UserRole),
  balance: z.number().int().min(0),
  schoolId: z.string().cuid().nullable(),
  emailVerified: z.boolean(),
  image: z.string().url().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const updateUserSchema = userSchema.omit({
  password: true,
  emailVerified: true,
  createdAt: true,
  updatedAt: true,
});

export const updateUserPasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, {
        message: 'Current password must be at least 6 characters long',
      })
      .max(190, { message: 'Current password must not exceed 190 characters' }),
    newPassword: z
      .string()
      .min(6, { message: 'New password must be at least 6 characters long' })
      .max(190, { message: 'New password must not exceed 190 characters' }),
    confirmNewPassword: z.string(),
  })
  .refine(
    (data) => {
      return data.newPassword === data.confirmNewPassword;
    },
    { message: 'Passwords do not match', path: ['confirmNewPassword'] }
  );

export const createUserPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: 'New password must be at least 6 characters long' })
      .max(190, { message: 'New password must not exceed 190 characters' }),
    confirmNewPassword: z.string(),
  })
  .refine(
    (data) => {
      return data.newPassword === data.confirmNewPassword;
    },
    { message: 'Passwords do not match', path: ['confirmNewPassword'] }
  );
