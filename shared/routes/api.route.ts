import {createQueryParams} from "@/shared/lib";
import {ProductFilterParams} from "@/types/product.type";

export const apiRoutes = {
  login: "/auth/user",
  products: {
    productUnits: "/unit?order=ASC&page=1&take=50",
    productTypes: "/productType?order=ASC&page=1&take=50",
    product: "/product",
    deleteProduct: (productCode: string) => `/product/${productCode}`,
    getProducts: (page: number = 1, take: number = 50, params: ProductFilterParams) =>
      `/product${createQueryParams({...params, order: "DESC", page, take})}`,
  },
  rolesPermissions: {
    getRoles: "/role?order=ASC&page=1&take=50",
  },
  users: {
    getUserFilters: "/user",
  },
};
