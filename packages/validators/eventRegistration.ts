import { z } from 'zod';

export const baseEventRegistrationSchema = z.object({
  id: z.string().cuid(),
  cost: z.coerce.number().min(1, { message: 'Cost must be at least 1' }),
  paymentLimit: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  eventId: z.string().cuid({ message: 'Please select an event' }),
  schoolId: z.string().cuid({ message: 'Please select a school' }),
  createdAt: z.coerce.date(),
});

// payment limit must be before startDate
export const eventRegistrationSchema = baseEventRegistrationSchema.refine(
  (data) => {
    return data.paymentLimit < data.startDate;
  },
  {
    message: 'Payment limit must be before start date',
    path: ['paymentLimit'],
  }
);

export const addEventRegistrationSchema = baseEventRegistrationSchema.omit({
  id: true,
  createdAt: true,
});

export const updateEventRegistrationSchema = baseEventRegistrationSchema.omit({
  createdAt: true,
  schoolId: true,
});
