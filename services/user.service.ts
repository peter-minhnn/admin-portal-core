import globalAxiosInstance from "@/shared/configs/axios.config";
import { BaseResponseType, ListResponseType } from "@/types/common.type";
import { apiRoutes } from "@/shared/routes/api.route";
import {
  handleApiCatchResponse,
  handleApiResponse,
} from "@/services/api.service";
import {User, UserFilterType} from "@/types/user.type";
import { createQueryParams } from "@/shared/lib";

export const getUserFilters = async (params: UserFilterType) => {
  try {
    const response = await globalAxiosInstance.get<null, BaseResponseType>(
      `${apiRoutes.users.getUserFilters}${createQueryParams(params)}`,
    );
    return handleApiResponse<ListResponseType<User>>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};
