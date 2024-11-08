import globalAxiosInstance from "@/shared/configs/axios.config";
import { apiRoutes } from "@/shared/routes/api.route";
import {
  BaseResponseType,
  CommonCodeType,
  ListResponseType,
  PaginationState,
  ResultType,
} from "@/types/common.type";
import {
  handleApiCatchResponse,
  handleApiResponse,
} from "@/services/api.service";
import { ProductFormData, ProductType, UnitType } from "@/types/product.type";

export const getUnits = async () => {
  try {
    const response = await globalAxiosInstance.get<null, BaseResponseType>(
      apiRoutes.products.productUnits,
    );
    return handleApiResponse<ListResponseType<UnitType>>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};

export const getProductTypes = async () => {
  try {
    const response = await globalAxiosInstance.get<null, BaseResponseType>(
      apiRoutes.products.productTypes,
    );
    return handleApiResponse<ListResponseType<CommonCodeType>>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};

export const getProducts = async (pages: PaginationState) => {
  try {
    const response = await globalAxiosInstance.get<null, BaseResponseType>(
      apiRoutes.products.getProducts(pages.pageIndex + 1, pages.pageSize),
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
      data,
    );
    return handleApiResponse<ResultType>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};

export const updateProduct = async (data: ProductType) => {
  try {
    const response = await globalAxiosInstance.put<null, BaseResponseType>(
      apiRoutes.products.product,
      data,
    );
    return handleApiResponse<ResultType>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};

export const deleteProduct = async (productCode: string) => {
  try {
    const response = await globalAxiosInstance.delete<null, BaseResponseType>(
      apiRoutes.products.deleteProduct(productCode),
    );
    return handleApiResponse<ResultType>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};
