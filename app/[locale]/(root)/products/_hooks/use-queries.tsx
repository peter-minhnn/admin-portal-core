import { useMutation, useQuery } from '@tanstack/react-query';
import { PaginationState } from '@/types/common.type';
import {
  addProduct,
  deleteProduct,
  getProductPrice,
  getProducts,
  getProductTypes,
  getUnits,
  updateProduct,
  updateProductPrice,
} from '@/services/product.service';
import {
  ProductFilterParams,
  ProductFormData,
  ProductPriceType,
  ProductType,
} from '@/types/product.type';
import get from 'lodash/get';
import { toast } from 'sonner';
import { RESPONSE_LIST_KEY } from '@/shared/constants';

//-------------------------------------UNIT HOOKS----------------------------------------
export const useGetUnits = () => {
  return useQuery({
    queryKey: ['units'],
    queryFn: async () => await getUnits(),
    select: (data) => get(data, RESPONSE_LIST_KEY, []),
    refetchOnWindowFocus: false,
  });
};

//-------------------------------------PRODUCT TYPE HOOKS----------------------------------------
export const useGetProductTypes = () => {
  return useQuery({
    queryKey: ['productTypes'],
    queryFn: async () => await getProductTypes(),
    select: (data) => get(data, RESPONSE_LIST_KEY, []),
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
export const useAddProduct = (t: any) => {
  return useMutation({
    mutationFn: async (product: ProductType) => await addProduct(product),
    onSuccess: (response) => {
      const message = get(
        response,
        'result.messages[0]',
        t('notifications.addProductSuccess')
      );
      toast.success(message);
    },
    onError: () => toast.error(t('notifications.addProductError')),
  });
};

//UPDATE hook (put product in api)
export const useUpdateProduct = (t: any) => {
  return useMutation({
    mutationFn: async (product: ProductType) => await updateProduct(product),
    onSuccess: (response) => {
      const message = get(
        response,
        'result.messages[0]',
        t('notifications.updateProductSuccess')
      );
      toast.success(message);
    },
    onError: () => toast.error(t('notifications.updateProductError')),
  });
};

//DELETE hook (delete product in api)
export const useDeleteProduct = (t: any) => {
  return useMutation({
    mutationFn: async (productCode: string) => await deleteProduct(productCode),
    onSuccess: (response) => {
      const message = get(
        response,
        'result.messages[0]',
        t('notifications.deleteProductSuccess')
      );
      toast.success(message);
    },
    onError: () => toast.error(t('notifications.deleteProductError')),
  });
};

//-------------------------------------PRODUCT PRICE HOOKS-------------------------------------
export const useGetProductPrice = (product: ProductFormData) => {
  return useQuery({
    queryKey: ['product-price', product.productCode],
    queryFn: async () => await getProductPrice(product),
    select: (response) => {
      const list = get(response, RESPONSE_LIST_KEY, []) as ProductPriceType[];
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
export const useUpdateProductPrice = (t: any) => {
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
    },
    onError: () => toast.error(t('notifications.updateProductPriceError')),
  });
};
