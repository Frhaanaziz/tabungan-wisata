import z from 'zod';

export const fileSchema = z.object({
  id: z.string().cuid(),
  url: z.string().url(),
  thumbnailUrl: z.string().url().optional().nullable(),
  size: z.number().min(0),
  uploadedAt: z.coerce.date(),
  eventId: z.string().cuid().optional(),
});

export const addFileSchema = z.object({
  file: z.instanceof(File),
});

export const deleteFileSchema = fileSchema.pick({ id: true });
