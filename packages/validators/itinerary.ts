import { z } from 'zod';

export const itinerarySchema = z.object({
  id: z.string().cuid(),
  name: z
    .string()
    .min(1, { message: 'Location must have at least 1 character' })
    .max(190),
  description: z
    .string()
    .min(1, { message: 'Description must have at least 1 character' }),
  eventId: z.string(),
});

export const addItinerarySchema = itinerarySchema.omit({ id: true });

export const updateItinerarySchema = itinerarySchema.extend({
  id: z.string().cuid().optional(),
});
