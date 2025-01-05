import { useMutation, useQuery } from '@tanstack/react-query';
import { PaginationState } from '@/types/common.type';
import {
  addOrder,
  addProduct,
  approveOrder,
  deleteOrder,
  deleteProduct,
  downloadFile,
  getCustomers,
  getOrderDetail,
  getOrders,
  getProductPriceDetail,
  getProductPriceListDetail,
  getProductPrices,
  getProducts,
  getProductTypes,
  getUnits,
  updateOrder,
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
import {
  ApproveOrderType,
  OrderRequestType,
  ProductOrderFilterParams,
} from '@/types/order.type';
import { format } from 'date-fns';
import { downloadExcelFile } from '@/shared/lib'; //or use your library of choice here

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
      if (!response.result.isSuccess) {
        toast.error(message);
        return;
      }
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
      if (!response.result.isSuccess) {
        toast.error(message);
        return;
      }
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
      if (!response.result.isSuccess) {
        toast.error(message);
        return;
      }
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
      if (!response.result.isSuccess) {
        toast.error(message);
        return;
      }
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
  });
};

export const useGetCustomers = (
  pagination: PaginationState,
  type: 'list' | 'dialog' = 'list'
) => {
  return useQuery({
    queryKey: ['customers', pagination],
    queryFn: async () => await getCustomers(pagination),
    refetchOnWindowFocus: false,
    enabled: type === 'list',
  });
};

export const useGetProductOptions = (
  pagination: PaginationState,
  params: ProductPriceFilterParams
) => {
  return useQuery({
    queryKey: ['product-options', pagination, params],
    queryFn: async () => await getProductPrices({ ...params, ...pagination }),
    refetchOnWindowFocus: false,
  });
};

export const useAddOrder = (t: any, closeModal: () => void) => {
  return useMutation({
    mutationFn: async (product: OrderRequestType) => await addOrder(product),
    onSuccess: (response) => {
      const message = get(
        response,
        'result.messages[0]',
        t('notifications.addOrderSuccess')
      );
      if (!response.result.isSuccess) {
        toast.error(message);
        return;
      }

      toast.success(message);
      closeModal();
    },
    onError: () => toast.error(t('notifications.addOrderError')),
  });
};

export const useUpdateOrder = (t: any, closeModal: () => void) => {
  return useMutation({
    mutationFn: async (product: OrderRequestType) => await updateOrder(product),
    onSuccess: (response) => {
      const message = get(
        response,
        'result.messages[0]',
        t('notifications.updateOrderSuccess')
      );
      if (!response.result.isSuccess) {
        toast.error(message);
        return;
      }

      toast.success(message);
      closeModal();
    },
    onError: () => toast.error(t('notifications.updateOrderError')),
  });
};

export const useDeleteOrder = (t: any, closeModal: () => void) => {
  return useMutation({
    mutationFn: async (orderCode: string) => await deleteOrder(orderCode),
    onSuccess: (response) => {
      const message = get(
        response,
        'result.messages[0]',
        t('notifications.deleteOrderSuccess')
      );
      if (!response.result.isSuccess) {
        toast.error(message);
        return;
      }

      toast.success(message);
      closeModal();
    },
    onError: () => toast.error(t('notifications.deleteOrderError')),
  });
};

export const useGetOrderDetail = (orderCode: string) => {
  return useQuery({
    queryKey: ['order-detail', orderCode],
    queryFn: async () => await getOrderDetail(orderCode),
    refetchOnWindowFocus: false,
    enabled: !!orderCode,
  });
};

export const useApproveOrder = (t: any, closeModal: () => void) => {
  return useMutation({
    mutationFn: async (product: ApproveOrderType) =>
      await approveOrder(product),
    onSuccess: (response) => {
      const message = get(
        response,
        'result.messages[0]',
        t('notifications.approveOrderSuccess')
      );
      if (!response.result.isSuccess) {
        toast.error(message);
        return;
      }

      toast.success(message);
      closeModal();
    },
    onError: () => toast.error(t('notifications.approveOrderError')),
  });
};

export const useOrdersExport = (t: any) => {
  return useMutation({
    mutationFn: async (params: ProductOrderFilterParams) =>
      await downloadFile(params),
    onSuccess: (response) => {
      console.log('response', response);

      if (!response) {
        toast.error(t('notifications.exportExcelError'));
        return;
      }
      downloadExcelFile(
        response,
        `orders-${format(new Date(), 'yyyyMMddHHmmss')}`
      );
    },
    onError: () => toast.error(t('notifications.exportExcelError')),
  });
};
