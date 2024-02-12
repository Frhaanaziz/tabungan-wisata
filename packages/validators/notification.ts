import z from 'zod';
import { PaymentStatus } from './payment';

export enum NotificationType {
  transaction = 'transaction',
  info = 'info',
}

export const notificationSchema = z.object({
  id: z.string(),
  message: z.string(),
  isRead: z.boolean(),
  type: z.nativeEnum(NotificationType),
  status: z.nativeEnum(PaymentStatus).optional(),
  userId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
