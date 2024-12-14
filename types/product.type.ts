import { z } from 'zod';
import {
  ProductFilterFormSchema,
  ProductFormSchema,
  ProductPriceFormSchema,
} from '@/app/[locale]/(root)/products/schema';

export type ProductType = {
  productCode: string;
  productName: string;
  productDesc: string;
  productImage: string;
  productType: string;
  unitCode: string;
  productPrice: number;
  productMinQty: number;
  productMaxQty: number;
  companyId: number;
  pricing?: PricingType;
  status?: boolean;
};

export type PricingType = {
  sellPrice: number;
  originalPrice: number;
};

export type UnitType = {
  unitCode: string;
  unitName: string;
  isActive: boolean;
  isDeleted: boolean;
  companyId: number;
};

export type ProductFilterParams = {
  content: string;
  productType: string;
};

export type ProductPriceType = {
  id?: string;
  productCode: string;
  description?: string;
  unitCode: string;
  price: number;
  originalPrice: number;
  isActive?: boolean;
  createdAt?: Date | null;
};

export type ProductPriceFilterParams = {
  productCode: string;
  page?: number;
  take?: number;
};

export type ProductFormData = z.infer<typeof ProductFormSchema>;
export type ProductFilterFormData = z.infer<typeof ProductFilterFormSchema>;
export type ProductPriceFormData = z.infer<typeof ProductPriceFormSchema>;
