import { z } from 'zod';
import { fileSchema } from './file';
import {
  addItinerarySchema,
  itinerarySchema,
  updateItinerarySchema,
} from './itinerary';

export const eventSchema = z.object({
  id: z.string().cuid(),
  name: z
    .string()
    .min(1, { message: 'Name must have at least 1 character' })
    .max(190),
  highlight: z.string().min(1, {
    message: 'Highlight must have at least 1 character',
  }),
  include: z.string().min(1, {
    message: 'Include must have at least 1 character',
  }),
  exclude: z.string().min(1, {
    message: 'Exclude must have at least 1 character',
  }),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  cost: z.coerce.number().min(0),
  schoolId: z.string().cuid({ message: 'Please select a school' }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  images: z.array(fileSchema),
  itineraries: z.array(itinerarySchema),
});

export const addEventSchema = eventSchema
  .omit({ id: true, itineraries: true, createdAt: true, updatedAt: true })
  .extend({
    images: z.array(fileSchema.omit({ id: true })).min(1, {
      message: 'Please upload at least 1 image',
    }),
    itineraries: z.array(addItinerarySchema),
  });

export const updateEventSchema = eventSchema
  .omit({
    schoolId: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    images: z
      .array(fileSchema.omit({ id: true }))
      .min(1, { message: 'Please upload at least 1 image' }),
    itineraries: z.array(updateItinerarySchema),
  });
