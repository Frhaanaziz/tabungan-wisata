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
