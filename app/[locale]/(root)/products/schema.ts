import { z } from 'zod';

export const ProductFormSchema = z.object({
  productCode: z.string(),
  productType: z.string().min(1, { message: 'errors.productType' }),
  productName: z.string().min(1, { message: 'errors.productName' }),
  productDesc: z.string().or(z.null()).optional(),
  productImage: z.string().or(z.null()).optional(),
  unitCode: z.string().min(1, { message: 'errors.unitCode' }),
  productPrice: z
    .number()
    .min(1, { message: 'errors.productPrice' })
    .default(0),
  productMinQty: z
    .number()
    .min(1, { message: 'errors.productMinQty' })
    .default(0),
  productMaxQty: z
    .number()
    .min(1, { message: 'errors.productMaxQty' })
    .default(0),
  companyId: z.number().or(z.null()).optional(),
});

export const ProductFilterFormSchema = z.object({
  content: z.string().optional(),
  productType: z.string().optional(),
});

export const ProductPriceFormSchema = z
  .object({
    originalPrice: z.number(),
    price: z
      .number({ message: 'errors.wrongInputNumberType' })
      .min(1, { message: 'errors.price' }),
  })
  .refine((data) => Number(data.price) <= Number(data.originalPrice), {
    message: 'errors.priceNotGreaterThanProductPrice',
    path: ['price'],
  });

export const ProductOrderFilterFormSchema = z.object({
  orderCode: z.string().optional(),
  customerId: z.string().optional(),
  fromDate: z
    .string()
    .min(1, { message: 'errors.fromDate' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'errors.invalidDateFormat',
    }),
  toDate: z
    .string()
    .min(1, { message: 'errors.toDate' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'errors.invalidDateFormat',
    }),
  deliveryType: z.string().optional(),
  orderStatus: z.string().optional(),
  paymentStatus: z.string().optional(),
});

export const ProductOrderFormSchema = z.object({
  orderCode: z.string().optional(),
  customerId: z
    .string()
    .min(1, { message: 'errors.orders.customerIdRequired' }),
  totalAmount: z
    .number()
    .int()
    .min(1, { message: 'errors.orders.totalAmountRequired' })
    .default(0),
  totalPrice: z
    .number()
    .int()
    .min(1, { message: 'errors.orders.totalPriceRequired' })
    .default(0),
  discountAmount: z.number().optional().default(0),
  discountPercent: z.number().optional().default(0),
  deliveryType: z
    .string()
    .min(1, { message: 'errors.orders.deliveryTypeRequired' }),
  orderStatus: z
    .string()
    .min(1, { message: 'errors.orders.orderStatusRequired' }),
  paymentStatus: z
    .string()
    .min(1, { message: 'errors.orders.paymentStatusRequired' }),
  deliveryAddress: z
    .string()
    .min(1, { message: 'errors.orders.deliveryAddressRequired' }),
  orderDetails: z
    .array(
      z.object({
        productCode: z
          .string()
          .min(1, { message: 'errors.orders.productCodeRequired' })
          .default(''),
        unitCode: z.string().optional().default(''),
        quantity: z
          .number()
          .int()
          .min(1, { message: 'errors.orders.quantityRequired' })
          .default(0),
        remainQty: z.number().optional().default(0),
        price: z
          .number()
          .int()
          .min(1, { message: 'errors.orders.priceRequired' })
          .default(0),
      })
    )
    .default([]),
  orderDate: z.string().optional().default(''),
  phoneNumber: z.string().optional().default(''),
});
