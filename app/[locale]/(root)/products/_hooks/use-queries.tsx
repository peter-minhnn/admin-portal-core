import { useMutation, useQuery } from '@tanstack/react-query';
import { PaginationState } from '@/types/common.type';
import {
  addProduct,
  deleteProduct,
  getOrders,
  getProductPriceDetail,
  getProductPriceListDetail,
  getProductPrices,
  getProducts,
  getProductTypes,
  getUnits,
  updateProduct,
  updateProductPrice,
} from '@/services/product.service';
import {
  ProductFilterParams,
  ProductPriceFilterParams,
  ProductPriceType,
  ProductType,
} from '@/types/product.type';
import get from 'lodash/get';
import { toast } from 'sonner';
import { RESPONSE_LIST_KEY } from '@/shared/constants';
import { ProductOrderFilterParams } from '@/types/order.type';

//-------------------------------------UNIT HOOKS----------------------------------------
export const useGetUnits = () => {
  return useQuery({
    queryKey: ['units'],
    queryFn: async () => await getUnits(),
    select: (data) => get(data.result, RESPONSE_LIST_KEY, []),
    refetchOnWindowFocus: false,
  });
};

//-------------------------------------PRODUCT TYPE HOOKS----------------------------------------
export const useGetProductTypes = () => {
  return useQuery({
    queryKey: ['productTypes'],
    queryFn: async () => await getProductTypes(),
    select: (data) => get(data.result, RESPONSE_LIST_KEY, []),
    refetchOnWindowFocus: false,
  });
};

//-------------------------------------PRODUCT HOOKS-------------------------------------
export const useGetProducts = (
  pagination: PaginationState,
  params: ProductFilterParams
) => {
  return useQuery({
    queryKey: ['products', pagination, params],
    queryFn: async () => await getProducts(pagination, params),
    refetchOnWindowFocus: false,
  });
};

//ADD hook (post product in api)
export const useAddProduct = (t: any, closeModal: () => void) => {
  return useMutation({
    mutationFn: async (product: ProductType) => await addProduct(product),
    onSuccess: (response) => {
      const message = get(
        response,
        'result.messages[0]',
        t('notifications.addProductSuccess')
      );
      toast.success(message);
      closeModal();
    },
    onError: () => toast.error(t('notifications.addProductError')),
  });
};

//UPDATE hook (put product in api)
export const useUpdateProduct = (t: any, closeModal: () => void) => {
  return useMutation({
    mutationFn: async (product: ProductType) => await updateProduct(product),
    onSuccess: (response) => {
      const message = get(
        response,
        'result.messages[0]',
        t('notifications.updateProductSuccess')
      );
      toast.success(message);
      closeModal();
    },
    onError: () => toast.error(t('notifications.updateProductError')),
  });
};

//DELETE hook (delete product in api)
export const useDeleteProduct = (t: any, closeModal: () => void) => {
  return useMutation({
    mutationFn: async (productCode: string) => await deleteProduct(productCode),
    onSuccess: (response) => {
      const message = get(
        response,
        'result.messages[0]',
        t('notifications.deleteProductSuccess')
      );
      toast.success(message);
      closeModal();
    },
    onError: () => toast.error(t('notifications.deleteProductError')),
  });
};

//-------------------------------------PRODUCT PRICE HOOKS-------------------------------------
export const useGetProductPrices = (params: ProductPriceFilterParams) => {
  return useQuery({
    queryKey: ['product-price', params],
    queryFn: async () => await getProductPrices(params),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};

export const useGetProductPriceListDetail = (
  productCode: string,
  unitCode: string,
  page: number
) => {
  return useQuery({
    queryKey: ['product-price-list', productCode, unitCode, page],
    queryFn: async () =>
      await getProductPriceListDetail(productCode, unitCode, page),
    select: (response) => {
      const list = get(
        response.result,
        RESPONSE_LIST_KEY,
        []
      ) as ProductPriceType[];
      return {
        ...response,
        result: {
          data: list,
        },
      };
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};

export const useGetProductPriceDetail = (productCode: string) => {
  return useQuery({
    queryKey: ['product-price', productCode],
    queryFn: async () => await getProductPriceDetail(productCode),
    select: (response) => {
      const list = get(
        response.result,
        RESPONSE_LIST_KEY,
        []
      ) as ProductPriceType[];
      return {
        ...response,
        result: {
          data: list.find((v) => v.isActive),
        },
      };
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};

//UPDATE hook (put product price in api)
export const useUpdateProductPrice = (t: any, closeModal: any) => {
  return useMutation({
    mutationFn: async (product: ProductPriceType) =>
      await updateProductPrice(product),
    onSuccess: (response) => {
      const message = get(
        response,
        'result.messages[0]',
        t('notifications.updateProductPriceSuccess')
      );
      toast.success(message);
      closeModal();
    },
    onError: () => toast.error(t('notifications.updateProductPriceError')),
  });
};

//-------------------------------------PRODUCT ORDER HOOKS-------------------------------------
export const useGetOrders = (
  pagination: PaginationState,
  params: ProductOrderFilterParams
) => {
  return useQuery({
    queryKey: ['orders', pagination, params],
    queryFn: async () => await getOrders(params, pagination),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
