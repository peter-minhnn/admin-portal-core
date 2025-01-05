'use client';

import { BaseResponseType, ResultType } from '@/types/common.type';
import get from 'lodash/get';
import { StatusCodes } from '@/shared/enums';
import { logout } from '@/actions/login.action';
import { pageRoutes } from '@/shared/routes/pages.route';
import { toast } from 'sonner';

export function handleApiResponse<T>(response: BaseResponseType<T>) {
  const isSuccess = get(response, 'isSuccess', null);
  if (!isSuccess) {
    return {
      type: 'success',
      result: response.data as BaseResponseType<T>,
    };
  }

  return {
    type: 'error',
    result: {
      data: {} as T,
      isSuccess: false,
      messages: get(response, 'data.messages', []),
      statusCode: response?.statusCode ?? StatusCodes.BAD_REQUEST,
    } as BaseResponseType<T>,
  };
}

export async function handleApiCatchResponse<T>(e: any): Promise<ResultType> {
  if (e?.code === 'ERR_NETWORK') {
    return {
      type: 'error',
      result: {
        isSuccess: false,
        messages: ['Network error'],
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      } as BaseResponseType<T>,
    };
  }

  await redirectPageErrors(e);

  const messageError = get(e.response, 'data.messages', []);
  return {
    type: 'error',
    result: {
      isSuccess: false,
      messages: messageError ?? ['Something went wrong'],
      statusCode: e?.status ?? StatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
    } as BaseResponseType<T>,
  };
}

async function redirectPageErrors(e: any) {
  switch (e?.status) {
    case StatusCodes.NOT_FOUND:
      window.location.href = pageRoutes.notFound;
      break;
    case StatusCodes.UNAUTHORIZED:
      await logout();
      break;
    case StatusCodes.SERVICE_UNAVAILABLE:
      window.location.href = pageRoutes.maintenance;
      break;
    case StatusCodes.INTERNAL_SERVER_ERROR:
      window.location.href = pageRoutes.internalServerError;
      break;
    default:
      break;
  }
}

export function handleQueryResponse(
  response: any,
  messageStr: string,
  callback: (value: any) => void
) {
  const message = get(response, 'result.messages[0]', messageStr);
  if (!response.result.isSuccess) {
    toast.error(message);
    return;
  }
  toast.success(message);
  callback(response.result.data);
}
