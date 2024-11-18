import globalAxiosInstance from '@/shared/configs/axios.config';
import {
  BaseResponseType,
  ListResponseType,
  ResultType,
} from '@/types/common.type';
import { apiRoutes } from '@/shared/routes/api.route';
import {
  handleApiCatchResponse,
  handleApiResponse,
} from '@/services/api.service';
import { User, UserFilterType } from '@/types/user.type';
import { createQueryParams } from '@/shared/lib';

export const getUserFilters = async (params: UserFilterType) => {
  try {
    const response = await globalAxiosInstance.get<null, BaseResponseType>(
      `${apiRoutes.users.user}${createQueryParams(params)}`
    );
    return handleApiResponse<ListResponseType<User>>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};

export const updateUser = async (data: User) => {
  try {
    const response = await globalAxiosInstance.post<null, BaseResponseType>(
      apiRoutes.users.user,
      data
    );
    return handleApiResponse<ResultType>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};
