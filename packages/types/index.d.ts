import type { z } from 'zod';
import type { paginatedDataUtilsSchema } from '@repo/validators/index';
import type { userSchema } from '@repo/validators/user';
import type { schoolSchema } from '@repo/validators/school';
import { eventSchema, eventSchemaJoined } from '@repo/validators/event';
import { paymentSchema } from '@repo/validators/payment';
import { fileSchema } from '@repo/validators/file';
import { withdrawalSchema } from '@repo/validators/withdrawal';
import { eventRegistrationSchema } from '@repo/validators/eventRegistration';

export enum UserRole {
  admin = 'admin',
  student = 'student',
  teacher = 'teacher',
}

export type PaginatedDataUtils = z.infer<typeof paginatedDataUtilsSchema>;

export type School = z.infer<typeof schoolSchema> & {
  _count: { users: number };
};
export type SchoolsPaginated = PaginatedDataUtils & {
  content: School[];
};

export type User = z.infer<typeof userSchema> & { school: School };
export type UsersPaginated = PaginatedDataUtils & {
  content: User[];
};

export type Event = z.infer<typeof eventSchema>;
export type EventJoined = z.infer<typeof eventSchemaJoined>;
export type EventsPaginated = PaginatedDataUtils & {
  content: Event[];
};

export type EventRegistration = z.infer<typeof eventRegistrationSchema>;

export type Payment = z.infer<typeof paymentSchema> & { user: User };
export type PaymentsPaginated = PaginatedDataUtils & {
  content: Payment[];
};

export type Withdrawal = z.infer<typeof withdrawalSchema> & { user: User };
export type WithdrawalsPaginated = PaginatedDataUtils & {
  content: Withdrawal[];
};

export type File = z.infer<typeof fileSchema>;
