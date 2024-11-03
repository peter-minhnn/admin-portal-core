import { CommonType } from "@/types/common.type";

export type ProductType = {
  id: number;
  productCode: string;
  productName: string;
  productDesc: number;
  productImage: string;
  isActive: boolean;
  isDeleted: boolean;
  companyId: number;
} & CommonType;
