import { z } from 'zod'

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
})

export const ProductFilterFormSchema = z.object({
    content: z.string().optional(),
    productType: z.string().optional(),
})

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
    })

export const ProductOrderFilterFormSchema = z.object({
    orderCode: z.string().optional(),
    customerId: z.number().optional(),
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
    isExport: z.number().optional(),
})
