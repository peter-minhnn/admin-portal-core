import { createQueryParams } from '@/shared/lib';
import { ProductFilterParams } from '@/types/product.type';

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
    getProductPrice: (productCode: string) =>
      `/product-price?page=1&take=50&productCode=${productCode}`,
    productPrice: '/product-price',
  },
  rolesPermissions: {
    getRoles: '/role?order=ASC&page=1&take=50',
  },
  users: {
    user: '/user',
    getUserInfo: (userName: string) => `/user?userName=${userName}`,
  },
};
