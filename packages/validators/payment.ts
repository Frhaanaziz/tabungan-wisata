import { z } from 'zod';

export enum PaymentStatus {
  pending = 'pending',
  completed = 'completed',
  failed = 'failed',
}

export const paymentSchema = z.object({
  id: z.string().cuid(),
  amount: z.coerce.number().int(),

  paymentMethod: z.string().optional().nullable(),
  userId: z.string().cuid(),
  status: z.nativeEnum(PaymentStatus),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const addPaymentSchema = paymentSchema
  .pick({
    userId: true,
  })
  .extend({
    amount: z.coerce
      .number()
      .int()
      .min(1, { message: 'Amount must be greater than 0' })
      .max(2147483647, { message: 'Amount must be less than 2147483647' }),
  });

export const updatePaymentSchema = paymentSchema.pick({
  status: true,
  id: true,
});
