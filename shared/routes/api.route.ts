import { createQueryParams } from '@/shared/lib';
import { ProductFilterParams, ProductFormData } from '@/types/product.type';
import { OrderFilterParams } from '@/types/order.type';

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
      take: number = 50
    ) =>
      `/product${createQueryParams({ ...params, order: 'DESC', page, take })}`,
    getProductPrice: (product: ProductFormData) =>
      `/product-price?page=1&take=50&productCode=${product.productCode}`,
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
    getOrders: (
      params: OrderFilterParams,
      page: number = 1,
      take: number = 50
    ) => `/order${createQueryParams({ ...params, order: 'DESC', page, take })}`,
  },
};
