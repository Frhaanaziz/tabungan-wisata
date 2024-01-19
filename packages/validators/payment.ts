import { z } from "zod";

export enum PaymentStatus {
  pending = "pending",
  completed = "completed",
  failed = "failed",
}

export const paymentSchema = z.object({
  id: z.string().cuid(),
  amount: z.number(),
  date: z.date(),
  userId: z.string().cuid(),
  status: z.nativeEnum(PaymentStatus),
  // user: userSchema.optional(),
});
