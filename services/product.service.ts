import globalAxiosInstance from "@/shared/configs/axios.config";
import { apiRoutes } from "@/shared/routes/api.route";
import {BaseResponseType, CommonCodeType, ListResponseType, PaginationState, ResultType} from "@/types/common.type";
import { handleApiCatchResponse, handleApiResponse } from "@/services/api.service";
import {ProductType, UnitType} from "@/types/product.type";
import {z} from "zod";
import {ProductFormSchema} from "@/app/[locale]/(root)/products/schema";

export const getUnits = async () => {
    try {
        const response = await globalAxiosInstance.get<null, BaseResponseType>(apiRoutes.products.productUnits);
        return handleApiResponse<ListResponseType<UnitType>>(response);
    } catch (e) {
        return handleApiCatchResponse(e);
    }
};

export const getProductTypes = async () => {
    try {
        const response = await globalAxiosInstance.get<null, BaseResponseType>(apiRoutes.products.productTypes);
        return handleApiResponse<ListResponseType<CommonCodeType>>(response);
    } catch (e) {
        return handleApiCatchResponse(e);
    }
};

export const getProducts = async (pages: PaginationState) => {
    try {
        const response = await globalAxiosInstance.get<null, BaseResponseType>(apiRoutes.products.getProducts(pages.pageIndex + 1, pages.pageSize));
        return handleApiResponse<ListResponseType<ProductType>>(response);
    } catch (e) {
        return handleApiCatchResponse(e);
    }
};

export const addProduct = async (data: z.infer<typeof ProductFormSchema>) => {
    try {
        const response = await globalAxiosInstance.post<null, BaseResponseType>(apiRoutes.products.addProduct, data);
        return handleApiResponse<ResultType>(response);
    } catch (e) {
        return handleApiCatchResponse(e);
    }
};
