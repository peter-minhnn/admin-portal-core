import { UserLoginRequestType } from '@/types/user.type';
import { apiRoutes } from '@/shared/routes/api.route';
import { BaseResponseType } from '@/types/common.type';
import {
  handleApiCatchResponse,
  handleApiResponse,
} from '@/services/api.service';
import { useAxios } from '@/hooks/use-axios';

export const login = async <T>(data: UserLoginRequestType) => {
  try {
    const response = await useAxios.post<
      null,
      BaseResponseType<T>,
      UserLoginRequestType
    >(apiRoutes.login, data);
    return handleApiResponse<T>(response);
  } catch (e) {
    return handleApiCatchResponse<T>(e);
  }
};
