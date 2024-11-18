import { z } from 'zod';

export const ProductFormSchema = z.object({
  productCode: z.string(),
  productType: z.string().min(1, { message: 'errors.productType' }),
  productName: z.string().min(1, { message: 'errors.productName' }),
  productDesc: z.string().or(z.null()).optional(),
  productImage: z.string().or(z.null()).optional(),
  unitCode: z.string().min(1, { message: 'errors.unitCode' }),
  productPrice: z
    .string()
    .min(1, { message: 'errors.productPrice' })
    .regex(/^\d+$/, {
      message: 'errors.onlyNumber',
    }),
  productMinQty: z
    .string()
    .min(1, { message: 'errors.productMinQty' })
    .regex(/^\d+$/, {
      message: 'errors.onlyNumber',
    }),
  productMaxQty: z
    .string()
    .min(1, { message: 'errors.productMaxQty' })
    .regex(/^\d+$/, {
      message: 'errors.onlyNumber',
    }),
  companyId: z.number().or(z.null()).optional(),
});

export const ProductFilterFormSchema = z.object({
  content: z.string().optional(),
  productType: z.string().optional(),
});

export const ProductPriceFormSchema = z
  .object({
    productPrice: z.string().regex(/^\d+$/, { message: 'errors.onlyNumber' }),
    price: z
      .number({ message: 'errors.wrongInputNumberType' })
      .min(1, { message: 'errors.price' }),
  })
  .refine((data) => data.price >= parseFloat(data.productPrice), {
    message: 'errors.priceNotGreaterThanProductPrice',
    path: ['price'],
  });
