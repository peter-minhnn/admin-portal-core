import { z } from 'zod';
import { Gender } from '@/shared/enums';
import {
  CustomerFilterFormSchema,
  CustomerFormSchema,
} from '@/app/[locale]/(root)/customers/shema';

export type CustomerType = {
  id: number;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: string;
  avatar: string;
  address: string;
  deviceToken: string;
  companyId: number;
  isActive: boolean;
};

export type CustomerFilterType = {
  phoneNumber?: string;
  address?: string;
};

export type CustomerFormData = z.infer<typeof CustomerFormSchema>;
export type CustomerFilterFormData = z.infer<typeof CustomerFilterFormSchema>;
