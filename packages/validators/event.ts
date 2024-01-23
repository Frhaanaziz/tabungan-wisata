import { z } from 'zod';
import { fileSchema } from './file';
export const eventSchema = z.object({
  id: z.string().cuid(),
  name: z
    .string()
    .min(1, { message: 'Name must have at least 1 character' })
    .max(190),
  description: z
    .string()
    .min(1, { message: 'Description must have at least 1 character' }),
  include: z.string().min(1, {
    message: 'Include must have at least 1 character',
  }),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  cost: z.coerce.number().min(0),
  schoolId: z.string().cuid({ message: 'Please select a school' }),
  images: z
    // .array(fileSchema.omit({ id: true }))
    .array(fileSchema)
    .min(1, { message: 'Please upload at least 1 image' }),
  // registrations: z.array(eventRegistrationSchema).optional(),
  // school: schoolSchema.optional(),
});

export const addEventSchema = eventSchema.omit({ id: true }).extend({
  images: z.array(fileSchema.omit({ id: true })).min(1, {
    message: 'Please upload at least 1 image',
  }),
});

export const updateEventSchema = eventSchema
  .omit({
    schoolId: true,
  })
  .extend({
    images: z
      .array(fileSchema.omit({ id: true }))
      .min(1, { message: 'Please upload at least 1 image' }),
  });
