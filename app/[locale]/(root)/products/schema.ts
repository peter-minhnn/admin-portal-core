import { z } from "zod";

export const ProductFormSchema = z.object({
  productCode: z.string(),
  productType: z.string().min(1, { message: "Product type is required" }),
  productName: z.string().min(1, { message: "Product name is required" }),
  productDesc: z.string().optional(),
  productImage: z.string().optional(),
  unitCode: z.string().min(1, { message: "Unit code is required" }),
  productPrice: z.string().min(1, { message: "Product price is required" }),
  productMinQty: z
    .string()
    .min(1, { message: "Product minimum quantity is required" }),
  productMaxQty: z
    .string()
    .min(1, { message: "Product maximum quantity is required" }),
  companyId: z.number().optional(),
});
