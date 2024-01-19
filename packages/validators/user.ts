import { z } from "zod";

export enum UserRole {
  student = "student",
  teacher = "teacher",
  admin = "admin",
}

export const userSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1).max(190),
  email: z.string().email().max(190),
  password: z.string().min(6).max(190),
  role: z.nativeEnum(UserRole),
  schoolId: z.string().cuid(),
  emailVerified: z.boolean(),
  // payments: z.array(paymentSchema).optional(),
  // registrations: z.array(eventRegistrationSchema).optional(),
  // school: schoolSchema.optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
