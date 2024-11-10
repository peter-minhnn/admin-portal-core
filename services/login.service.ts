import { UserLoginType } from "@/types/user.type";
import axiosConfig from "@/shared/configs/axios.config";
import { apiRoutes } from "@/shared/routes/api.route";
import { BaseResponseType, ResultType } from "@/types/common.type";
import {
  handleApiCatchResponse,
  handleApiResponse,
} from "@/services/api.service";

export const login = async (data: UserLoginType) => {
  try {
    const response = await axiosConfig.post<null, BaseResponseType>(
      apiRoutes.login,
      data,
    );
    return handleApiResponse<ResultType>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};
