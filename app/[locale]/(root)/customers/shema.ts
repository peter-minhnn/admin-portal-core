import { z } from 'zod';

export const CustomerFormSchema = z.object({
  id: z.number().int().optional(),
  phoneNumber: z
    .string()
    .min(1, { message: 'errors.phoneRequired' })
    .regex(/^\d+$/, { message: 'errors.onlyNumber' }),
  firstName: z.string().min(1, { message: 'errors.firstNameRequired' }),
  lastName: z.string().min(1, { message: 'errors.lastNameRequired' }),
  email: z
    .string()
    .min(1, { message: 'errors.emailRequired' })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'errors.invalidEmail' }),
  avatar: z.string().optional().default(''),
  gender: z.string().min(1, { message: 'errors.genderRequired' }),
  birthDate: z.string().optional().default(''),
  address: z.string().min(1, { message: 'errors.addressRequired' }).default(''),
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
