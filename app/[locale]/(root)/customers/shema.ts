import { z } from 'zod';

export const CustomerFormSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, { message: 'errors.phoneRequired' })
    .regex(/^\d+$/, { message: 'errors.onlyNumber' }),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  avatar: z.string().optional().default(''),
  gender: z.number().int().optional().default(0),
  birthDate: z.string().optional().default(''),
  address: z.string().optional().default(''),
  companyId: z.number().int().default(1),
});

export const CustomerFilterFormSchema = z.object({
  phoneNumber: z.string().optional().default(''),
  address: z.string().optional().default(''),
});
