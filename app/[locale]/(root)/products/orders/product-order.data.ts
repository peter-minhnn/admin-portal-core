import { ActionType, CommonCodeType } from '@/types/common.type';
const selectAll = { code: 'all', name: 'selectAll', isActive: true };

export const DeliveryOrderData: CommonCodeType[] = [
  selectAll,
  {
    code: 'COD',
    name: 'COD',
    isActive: true,
  },
  {
    code: 'PICKUP',
    name: 'PICKUP',
    isActive: true,
  },
];

export const OrderStatusData = (mode: ActionType) => {
  return [
    {
      ...selectAll,
      isActive: ['search'].includes(mode),
    },
    {
      code: 'NEW',
      name: 'NEW',
      isActive: ['add', 'edit', 'search'].includes(mode),
    },
    {
      code: 'APPROVED',
      name: 'APPROVED',
      isActive: ['edit', 'search'].includes(mode),
    },
    {
      code: 'DELIVERED',
      name: 'DELIVERED',
      isActive: ['edit', 'search'].includes(mode),
    },
    {
      code: 'CANCELLED',
      name: 'CANCELLED',
      isActive: ['edit', 'search'].includes(mode),
    },
    {
      code: 'REJECTED',
      name: 'REJECTED',
      isActive: ['edit', 'search'].includes(mode),
    },
  ] as CommonCodeType[];
};

export const PaymentStatusData = (mode: ActionType) => {
  return [
    {
      ...selectAll,
      isActive: mode === 'search',
    },
    {
      code: 'PENDING',
      name: 'PENDING',
      isActive: ['add', 'edit', 'search'].includes(mode),
    },
    {
      code: 'PAID',
      name: 'PAID',
      isActive: ['edit', 'search'].includes(mode),
    },
  ] as CommonCodeType[];
};
