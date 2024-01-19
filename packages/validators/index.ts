import { z } from "zod";

export const paginatedDataUtilsSchema = z.object({
  currentPage: z.number().min(1),
  totalRow: z.number(),
  rowsPerPage: z.number(),
  totalPages: z.number(),
});
