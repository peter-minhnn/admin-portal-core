import { z } from 'zod';

export const CustomerFormSchema = z.object({
  id: z.number().int().optional(),
  phoneNumber: z
    .string()
    .min(1, { message: 'errors.phoneRequired' })
    .regex(/^\d+$/, { message: 'errors.onlyNumber' }),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().optional().default(''),
  avatar: z.string().optional().default(''),
  gender: z.number().int().optional().default(0),
  birthDate: z.string().optional().default(''),
  address: z.string().optional().default(''),
  companyId: z.number().int().default(1),
  isActive: z.boolean().optional().default(true),
});

export const CustomerFilterFormSchema = z.object({
  phoneNumber: z.string().optional().default(''),
  address: z.string().optional().default(''),
});

export const CustomerResetPwdFormSchema = z.object({
  email: z.string().default(''),
});
