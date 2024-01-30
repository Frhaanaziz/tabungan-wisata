import { z } from 'zod';
import { userSchema } from './user';

export const withdrawalSchema = z.object({
  id: z.string().cuid(),
  amount: z.coerce
    .number()
    .int()
    .min(1, { message: 'Amount must be greater than 0' })
    .max(2147483647, { message: 'Amount must be less than 2147483647' }),
  userId: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  user: userSchema,
});

export const addWithdrawalSchema = withdrawalSchema.pick({
  amount: true,
  userId: true,
});
