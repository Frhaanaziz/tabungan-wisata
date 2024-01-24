import { z } from 'zod';

export enum PaymentStatus {
  pending = 'pending',
  completed = 'completed',
  failed = 'failed',
}

export const paymentSchema = z.object({
  id: z.string().cuid(),
  amount: z.coerce
    .number()
    .int()
    .min(1, { message: 'Amount must be greater than 0' })
    .max(2147483647, { message: 'Amount must be less than 2147483647' }),
  date: z.coerce.date(),
  userId: z.string().cuid(),
  status: z.nativeEnum(PaymentStatus),
  // user: userSchema.optional(),
});

export const addPaymentSchema = paymentSchema.pick({
  amount: true,
  userId: true,
});

export const updatePaymentSchema = paymentSchema.pick({
  status: true,
  id: true,
});
