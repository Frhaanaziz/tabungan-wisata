import z from 'zod';

export const schoolAdminSchema = z.object({
  id: z.string().cuid(),
  name: z
    .string()
    .min(1, { message: 'Name should be at least 1 character long' })
    .max(190, { message: 'Name should be at most 190 characters long' }),
  contact: z
    .string()
    .min(1, { message: 'Contact should be at least 1 character long' })
    .max(190, { message: 'Contact should be at most 190 characters long' }),
  schoolId: z.string().cuid({ message: 'Please pick a school' }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const addSchoolAdminSchema = schoolAdminSchema.pick({
  name: true,
  contact: true,
  schoolId: true,
});

export const updateSchoolAdminSchema = schoolAdminSchema.pick({
  id: true,
  name: true,
  contact: true,
});
