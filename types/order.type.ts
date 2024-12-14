import {
  ProductOrderFilterFormSchema,
  ProductOrderFormSchema,
} from '@/app/[locale]/(root)/products/schema';
import { z } from 'zod';

export type DeliveryType = 'COD' | 'PICKUP' | '';
export type OrderStatus =
  | ''
  | 'NEW'
  | 'APPROVED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REJECTED';
export type PaymentStatus = '' | 'PENDING' | 'PAID';

export type ProductOrderType = {
  id: number;
  isActive: boolean;
  createdAt: Date | null;
  companyId: number;
  orderCode: string;
  orderDate: string;
  totalAmount: number;
  totalPrice: number;
  discountAmount: number;
  discountPercent: number;
  customerId: number;
  customerName: string;
  deliveryType: DeliveryType;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  approvedBy: string;
  approvedAt: Date | null; // Allow null if not set.
  contactName: string;
  contactNumber: string;
  deliveryAddress: string;
};

export type OrderRequestType = {
  orderCode: string;
  totalAmount: number;
  totalPrice: number;
  discountAmount: number;
  discountPercent: number;
  customerId: number;
  deliveryType: string;
  deliveryAddress: string;
  orderStatus: string;
  paymentStatus: string;
  orderDetails: OrderDetailRequestType[];
  companyId: number;
  orderDate: string;
  contactNumber: string;
  contactName: string;
};

export type OrderDetailRequestType = {
  productCode: string;
  unitCode: string;
  quantity: number;
  remainQty: number;
  price: number;
};

export type ProductOrderFilterParams = {
  orderCode?: string;
  customerId?: string;
  fromDate: string;
  toDate: string;
  deliveryType?: DeliveryType;
  orderStatus?: OrderStatus;
  paymentStatus?: PaymentStatus;
  isExport: boolean;
};

export type CustomerType = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export type ApproveOrderType = {
  orderCode: string;
  orderStatus: OrderStatus;
  approvedDesc: string;
};

export type ProductOrderFilterFormData = z.infer<
  typeof ProductOrderFilterFormSchema
>;

export type ProductOrderFormData = z.infer<typeof ProductOrderFormSchema>;
