import { createQueryParams } from '@/shared/lib';
import {
  ProductFilterParams,
  ProductPriceFilterParams,
} from '@/types/product.type';
import { ProductOrderFilterParams } from '@/types/order.type';
import { PAGE_SIZE } from '@/shared/enums';
import { PaginationState } from '@/types/common.type';

export const apiRoutes = {
  login: '/auth/user',
  products: {
    productUnits: '/unit?order=ASC&page=1&take=50',
    productTypes: '/productType?order=ASC&page=1&take=50',
    product: '/product',
    deleteProduct: (productCode: string) => `/product/${productCode}`,
    getProducts: (
      params: ProductFilterParams,
      page: number = 1,
      take: number = PAGE_SIZE
    ) =>
      `/product${createQueryParams({ ...params, order: 'DESC', page, take })}`,
    getProductPrices: (product: ProductPriceFilterParams) =>
      `/product-price${createQueryParams({ ...product })}`,
    getProductPriceDetail: (
      productCode: string,
      page: number = 1,
      take: number = PAGE_SIZE
    ) =>
      `/product-price${createQueryParams({ productCode, order: 'DESC', page, take })}`,
    getProductPriceListDetail: (
      productCode: string,
      unitCode: string,
      page: number = 1,
      take: number = PAGE_SIZE
    ) =>
      `/product-price/detail${createQueryParams({ productCode, unitCode, order: 'DESC', page, take })}`,
    productPrice: '/product-price',
  },
  rolesPermissions: {
    getRoles: '/role?order=ASC&page=1&take=50',
  },
  users: {
    user: '/user',
    getUserInfo: (userName: string) => `/user?userName=${userName}`,
  },
  orders: {
    order: '/order',
    getOrders: (
      params: ProductOrderFilterParams,
      page: number = 1,
      take: number = PAGE_SIZE
    ) => `/order${createQueryParams({ ...params, order: 'DESC', page, take })}`,
    getCustomers: (pagination: PaginationState) =>
      `/customer${createQueryParams({ order: 'DESC', page: pagination.pageIndex, take: pagination.pageSize })}`,
    orderByCode: (orderCode: string) => `/order/${orderCode}`,
    approve: '/order/approve',
    export: (filterParams: ProductOrderFilterParams) =>
      `/order/export${createQueryParams(filterParams)}`,
  },
  uploadFile: {
    post: '/files/upload',
    get: (path: string) => `/files/${path}`,
  },
  customers: {
    customer: '/customer',
    getCustomers: (page: number = 1, take: number = PAGE_SIZE) =>
      `/customer${createQueryParams({ order: 'DESC', page, take })}`,
    resetPassword: '/customer/reset-password',
    export: '/customer/export',
    create: '/customer/create',
  },
};
