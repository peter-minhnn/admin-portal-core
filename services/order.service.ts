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
import { OrderFilterParams, OrderType } from '@/types/order.type';

export const getOrders = async (
  pages: PaginationState,
  params: OrderFilterParams
) => {
  try {
    const response = await useAxios.get<null, BaseResponseType, OrderType>(
      apiRoutes.orders.getOrders(params, pages.pageIndex + 1, pages.pageSize)
    );
    return handleApiResponse<ListResponseType<OrderType>>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};
