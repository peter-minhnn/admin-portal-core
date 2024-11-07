import { BaseResponseType, ResultType } from "@/types/common.type";
import get from "lodash/get";
import { StatusCodes } from "@/shared/enums";
import {logout} from "@/actions/login.action";

export function handleApiResponse<T>(response: BaseResponseType) {
  const errorResponse = get(response, "data.code", null);
  if (!errorResponse) {
    return {
      type: "success",
      result: response.data.data as T,
    };
  }

  return {
    type: "error",
    result: {
      data: null,
      message: response?.data?.message ?? "",
      code: response?.data?.code ?? -1,
    },
  };
}

export function handleApiCatchResponse(e: any): ResultType {
  if (e?.status === StatusCodes.UNAUTHORIZED) {
    logout();
  }
  const messageError = get(e.response, "data.message", "");
  return {
    type: "error",
    result: {
      message: messageError ?? "Something went wrong",
      code: e?.status ?? StatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
    },
  };
}
