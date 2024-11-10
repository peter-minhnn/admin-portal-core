import { z } from "zod";

export const ProductFormSchema = z.object({
  productCode: z.string(),
  productType: z.string().min(1, { message: "Vui lòng chọn loại sản phẩm" }),
  productName: z.string().min(1, { message: "Vui lòng nhập tên sản phẩm" }),
  productDesc: z.string().optional(),
  productImage: z.string().optional(),
  unitCode: z.string().min(1, { message: "Vui lòng nhập giá sản phẩm" }),
  productPrice: z
    .string()
    .min(1, { message: "Vui lòng nhập giá sản phẩm" })
    .regex(/^\d+$/, {
      message: "Input must contain only numbers",
    }),
  productMinQty: z
    .string()
    .min(1, { message: "Vui lòng nhập số lượng tối thiểu" })
    .regex(/^\d+$/, {
      message: "Input must contain only numbers",
    }),
  productMaxQty: z
    .string()
    .min(1, { message: "Vui lòng nhập số lượng tối đa" })
    .regex(/^\d+$/, {
      message: "Input must contain only numbers",
    }),
  companyId: z.number().optional(),
});
