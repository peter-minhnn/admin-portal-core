import { z } from "zod";
import { ProductFormSchema } from "@/app/[locale]/(root)/products/schema";

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

export type ProductFormData = z.infer<typeof ProductFormSchema>;
