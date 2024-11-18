import globalAxiosInstance from '@/shared/configs/axios.config';
import { BaseResponseType } from '@/types/common.type';
import { apiRoutes } from '@/shared/routes/api.route';
import { User } from '@/types/user.type';

export const getUserInfo = async (userName: string) => {
  try {
    const response = await globalAxiosInstance.get<null, BaseResponseType>(
      apiRoutes.users.getUserInfo(userName)
    );
    return {
      type: 'success',
      result: response.data.data as User,
    };
  } catch {
    return {
      type: 'error',
      result: {
        roleCode: '',
      } as User,
    };
  }
};
