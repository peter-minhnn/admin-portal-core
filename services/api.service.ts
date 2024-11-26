'use client';

import { BaseResponseType, ResultType } from '@/types/common.type';
import get from 'lodash/get';
import { StatusCodes } from '@/shared/enums';
import { redirectPageErrors } from '@/actions/login.action';

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
