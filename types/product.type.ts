import { z } from "zod";
import {ProductFilterFormSchema, ProductFormSchema} from "@/app/[locale]/(root)/products/schema";

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
}

export type ProductFormData = z.infer<typeof ProductFormSchema>;
export type ProductFilterFormData = z.infer<typeof ProductFilterFormSchema>;
