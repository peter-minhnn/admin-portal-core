export type DeliveryType = 'COD' | 'PICKUP';
export type OrderStatus =
  | 'NEW'
  | 'APPROVED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REJECTED';
export type PaymentStatus = 'PENDING' | 'PAID';

export type OrderType = {
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
  deliveryType: DeliveryType;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  approvedBy: string;
  approvedAt: Date | null; // Allow null if not set.
};

export type OrderFilterParams = {
  orderCode: string;
  customerId: string;
  fromDate: string;
  toDate: string;
  deliveryType: DeliveryType;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  isExport?: boolean;
};
