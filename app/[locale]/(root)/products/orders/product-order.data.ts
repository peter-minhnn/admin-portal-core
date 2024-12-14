import { ActionType, CommonCodeType } from '@/types/common.type';
import { mkConfig } from 'export-to-csv';
import { format } from 'date-fns';
import { formatCurrency } from '@/shared/lib';
import {
  LocaleCurrencyConst,
  LocaleCurrencyUnitConst,
} from '@/shared/constants';
import {
  Locale,
  LocaleCurrency,
  LocaleUnitCurrency,
} from '@/shared/configs/i18n/config';

const selectAll = { code: 'all', name: 'selectAll', isActive: true };

export const DeliveryOrderData = (mode: ActionType) => {
  return [
    {
      ...selectAll,
      isActive: ['search'].includes(mode),
    },
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
};

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

export const csvConfig = (t: any) => {
  return mkConfig({
    fieldSeparator: ',',
    useKeysAsHeaders: false,
    filename: 'EXPORT_ORDERS_' + format(new Date(), 'yyyyMMddHHmmss'),
    columnHeaders: [
      { key: 'orderCode', displayLabel: t('orders.orderCode') },
      { key: 'orderDate', displayLabel: t('orders.orderDate') },
      { key: 'totalPrice', displayLabel: t('orders.totalPrice') },
      { key: 'contactName', displayLabel: t('orders.contactName') },
      { key: 'contactNumber', displayLabel: t('orders.contactNumber') },
      { key: 'deliveryAddress', displayLabel: t('orders.deliveryAddress') },
      { key: 'deliveryType', displayLabel: t('orders.deliveryType') },
      { key: 'orderStatus', displayLabel: t('orders.orderStatus') },
      { key: 'paymentStatus', displayLabel: t('orders.paymentStatus') },
      { key: 'approvedBy', displayLabel: t('orders.approvedBy') },
      { key: 'approveDesc', displayLabel: t('orders.approveReason') },
      { key: 'approvedAt', displayLabel: t('orders.approvedAt') },
    ],
  });
};

export const convertToOrderExcelData = (data: any[], locale: Locale) => {
  return data.map((item: any) => ({
    orderCode: item.orderCode,
    orderDate: item.orderDate,
    totalPrice: formatCurrency(
      item.totalPrice,
      LocaleCurrencyConst[locale] as LocaleCurrency,
      LocaleCurrencyUnitConst[locale] as LocaleUnitCurrency
    ),
    contactName: item.customerName,
    contactNumber: item.customerNumber,
    deliveryAddress: item.deliveryAddress,
    deliveryType: item.deliveryType,
    orderStatus: item.orderStatus,
    paymentStatus: item.paymentStatus,
    approvedAt: item.approvedAt
      ? format(new Date(item.approvedAt), 'dd/MM/yyyy HH:mm')
      : '',
    approvedBy: item.approvedBy,
    approvedDesc: item.approvedDesc,
  }));
};
