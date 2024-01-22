import z from 'zod';

export const fileSchema = z.object({
  id: z.string().cuid(),
  url: z.string().url(),
  thumbnailUrl: z.string().url().optional(),
  size: z.number().min(0),
  uploadedAt: z.date(),
});
