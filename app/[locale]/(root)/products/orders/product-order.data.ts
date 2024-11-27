import { CommonCodeType } from "@/types/common.type";

export const DeliveryOrderData: CommonCodeType[] = [
    {
        code: 'COD',
        name: 'COD',
        isActive: true
    },
    {
        code: 'PICKUP',
        name: 'PICKUP',
        isActive: true
    },
];

export const OrderStatusData: CommonCodeType[] = [
    {
        code: 'NEW',
        name: 'NEW',
        isActive: true
    },
    {
        code: 'APPROVED',
        name: 'APPROVED',
        isActive: true
    },
    {
        code: 'REJECTED',
        name: 'REJECTED',
        isActive: true
    },
    {
        code: 'DELIVERED',
        name: 'DELIVERED',
        isActive: true
    },
    {
        code: 'CANCELLED',
        name: 'CANCELLED',
        isActive: true
    },
];

export const PaymentStatusData: CommonCodeType[] = [
    {
        code: 'PENDING',
        name: 'PENDING',
        isActive: true
    },
    {
        code: 'PAID',
        name: 'PAID',
        isActive: true
    },
];