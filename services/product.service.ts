import globalAxiosInstance from '@/shared/configs/axios.config';
import { apiRoutes } from '@/shared/routes/api.route';
import {
  BaseResponseType,
  CommonCodeType,
  ListResponseType,
  PaginationState,
} from '@/types/common.type';
import {
  handleApiCatchResponse,
  handleApiResponse,
} from '@/services/api.service';
import {
  ProductFilterParams,
  ProductFormData,
  ProductPriceFilterParams,
  ProductPriceType,
  ProductType,
  UnitType,
} from '@/types/product.type';
import { useAxios } from '@/hooks/use-axios';
import { ProductOrderType, ProductOrderFilterFormData, CustomerType } from '@/types/order.type';

export const getUnits = async () => {
  try {
    const response = await globalAxiosInstance.get<null, BaseResponseType>(
      apiRoutes.products.productUnits
    );
    return handleApiResponse<ListResponseType<UnitType>>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};

export const getProductTypes = async () => {
  try {
    const response = await globalAxiosInstance.get<null, BaseResponseType>(
      apiRoutes.products.productTypes
    );
    return handleApiResponse<ListResponseType<CommonCodeType>>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};

export const getProducts = async (
  pages: PaginationState,
  params: ProductFilterParams
) => {
  try {
    const response = await globalAxiosInstance.get<null, BaseResponseType>(
      apiRoutes.products.getProducts(
        params,
        pages.pageIndex + 1,
        pages.pageSize
      )
    );
    return handleApiResponse<ListResponseType<ProductFormData>>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};

export const addProduct = async (data: ProductType) => {
  try {
    const response = await globalAxiosInstance.post<null, BaseResponseType>(
      apiRoutes.products.product,
      data
    );
    return handleApiResponse<ProductType>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};

export const updateProduct = async (data: ProductType) => {
  try {
    const response = await globalAxiosInstance.put<null, BaseResponseType>(
      apiRoutes.products.product,
      data
    );
    return handleApiResponse<ProductType>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};

export const deleteProduct = async (productCode: string) => {
  try {
    const response = await globalAxiosInstance.delete<null, BaseResponseType>(
      apiRoutes.products.deleteProduct(productCode)
    );
    return handleApiResponse<ProductType>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};

export const getProductPrices = async (params: ProductPriceFilterParams) => {
  try {
    const response = await useAxios.get<
      null,
      BaseResponseType,
      ProductPriceType
    >(apiRoutes.products.getProductPrices(params));
    return handleApiResponse<ListResponseType<ProductPriceType>>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};

export const getProductPriceDetail = async (productCode: string) => {
  try {
    const response = await globalAxiosInstance.get<null, BaseResponseType>(
      apiRoutes.products.getProductPriceDetail(productCode)
    );
    return handleApiResponse<ListResponseType<ProductPriceType>>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};

export const getProductPriceListDetail = async (
  productCode: string,
  unitCode: string,
  page: number
) => {
  try {
    const response = await globalAxiosInstance.get<null, BaseResponseType>(
      apiRoutes.products.getProductPriceListDetail(productCode, unitCode, page)
    );
    return handleApiResponse<ListResponseType<ProductPriceType>>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};

export const updateProductPrice = async (data: ProductPriceType) => {
  try {
    const response = await globalAxiosInstance.post<null, BaseResponseType>(
      apiRoutes.products.productPrice,
      data
    );
    return handleApiResponse<ProductPriceType>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};

export const getOrders = async (
  params: ProductOrderFilterFormData,
  pagination: PaginationState
) => {
  try {
    const response = await useAxios.get<
      null,
      BaseResponseType,
      ProductOrderType
    >(
      apiRoutes.orders.getOrders(
        params,
        pagination.pageIndex + 1,
        pagination.pageSize
      )
    );
    return handleApiResponse<ListResponseType<ProductOrderType>>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};

export const getCustomers = async (pagination: PaginationState) => {
  try {
    const response = await useAxios.get<
      null,
      BaseResponseType,
      CustomerType
    >(apiRoutes.orders.getCustomers(pagination));
    return handleApiResponse<ListResponseType<CustomerType>>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};
