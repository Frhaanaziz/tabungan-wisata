import { z } from 'zod';

export const eventRegistrationSchema = z.object({
  id: z.string().cuid(),
  eventId: z.string().cuid({ message: 'Please select an event' }),
  schoolId: z.string().cuid(),
  cost: z.coerce.number().min(1, { message: 'Cost must be at least 1' }),
  createdAt: z.coerce.date(),
});

export const addEventRegistrationSchema = eventRegistrationSchema.pick({
  eventId: true,
  schoolId: true,
  cost: true,
});
