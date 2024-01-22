import type { z } from 'zod';
import type { paginatedDataUtilsSchema } from '@repo/validators/index';
import type { userSchema } from '@repo/validators/user';
import type { schoolSchema } from '@repo/validators/school';
import { eventSchema } from '@repo/validators/event';
import { paymentSchema } from '@repo/validators/payment';
import { fileSchema } from '@repo/validators/file';

export type PaginatedDataUtils = z.infer<typeof paginatedDataUtilsSchema>;

export type School = z.infer<typeof schoolSchema> & {
  _count: { events: number; users: number };
};
export type SchoolsPaginated = PaginatedDataUtils & {
  content: School[];
};

export type User = z.infer<typeof userSchema> & { school: School };
export type UsersPaginated = PaginatedDataUtils & {
  content: User[];
};

export type Event = z.infer<typeof eventSchema> & { school: School };
export type EventsPaginated = PaginatedDataUtils & {
  content: Event[];
};

export type Payment = z.infer<typeof paymentSchema> & { user: User };
export type PaymentsPaginated = PaginatedDataUtils & {
  content: Payment[];
};

export type File = z.infer<typeof fileSchema>;
