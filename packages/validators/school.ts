import { z } from 'zod';
import { userSchema } from './user';
import { eventSchema } from './event';

// create a custom error message
export const schoolSchema = z.object({
  id: z.string().cuid(),
  code: z.string().min(1).max(190),
  name: z
    .string()
    .min(1, { message: 'Name must have at least 1 character' })
    .max(190, { message: 'Name must have at most 190 characters' }),
  address: z
    .string()
    .min(1, { message: 'Address must have at least 1 character' }),
  contact: z
    .string()
    .min(1, { message: 'Contact must have at least 1 character' })
    .max(190, { message: 'Contact must have at most 190 characters' }),
  users: z.array(userSchema).optional(),
  events: z.array(eventSchema).optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const addSchoolSchema = schoolSchema.pick({
  name: true,
  address: true,
  contact: true,
});

export const updateSchoolSchema = schoolSchema.pick({
  id: true,
  name: true,
  address: true,
  contact: true,
});
