import { z } from "zod";

export const eventRegistrationSchema = z.object({
  id: z.string().cuid(),
  eventId: z.string().cuid(),
  userId: z.string().cuid(),
  // event: eventSchema,
  // user: userSchema.optional(),
});
