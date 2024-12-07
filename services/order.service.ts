import {
  BaseResponseType,
  ListResponseType,
  PaginationState,
} from '@/types/common.type';
import { apiRoutes } from '@/shared/routes/api.route';
import {
  handleApiCatchResponse,
  handleApiResponse,
} from '@/services/api.service';
import { useAxios } from '@/hooks/use-axios';
import { ProductOrderFilterParams, ProductOrderType } from '@/types/order.type';

export const getOrders = async (
  pages: PaginationState,
  params: ProductOrderFilterParams
) => {
  try {
    const response = await useAxios.get<
      null,
      BaseResponseType,
      ProductOrderType
    >(apiRoutes.orders.getOrders(params, pages.pageIndex + 1, pages.pageSize));
    return handleApiResponse<ListResponseType<ProductOrderType>>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};
