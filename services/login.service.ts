import { LoginResponseType, UserLoginType } from "@/types/user.type";
import axiosConfig from "@/shared/configs/axios.config";
import { apiRoutes } from "@/shared/routes/api.route";
import { BaseResponseType } from "@/types/common.type";
import { handleApiCatchResponse, handleApiResponse } from "@/services/api.service";

export const loginService = async (data: UserLoginType) => {
  try {
    const response = await axiosConfig.post<null, BaseResponseType>(
      apiRoutes.login,
      data,
    );
    return handleApiResponse<LoginResponseType>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};
