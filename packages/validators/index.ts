import { z } from 'zod';

export const paginatedDataUtilsSchema = z.object({
  currentPage: z.number(),
  isFirstPage: z.boolean(),
  isLastPage: z.boolean(),
  previousPage: z.number(),
  nextPage: z.number(),
  rowsPerPage: z.number(),
  totalPages: z.number(),
  totalRow: z.number(),
});

export const getPaginatedDataSchema = z.object({
  page: z.coerce.number(),
  take: z.coerce.number().min(1).optional(),
  search: z.string().optional().default(''),
});

const acceptImageTypes = ['image/png', 'image/jpeg', 'image/jpg'];
export const imageSchema = z
  .instanceof(File)
  .refine((file) => file.size < 1 * 1024 * 1024, {
    message: 'File size must be less than 1MB',
  })
  .refine((file) => acceptImageTypes.includes(file.type), {
    message: 'File type must be PNG, JPEG, or JPG',
  });
