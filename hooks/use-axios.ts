import axiosConfig from '@/shared/configs/axios.config';
import get from 'lodash/get';
import { BaseResponseType } from '@/types/common.type';
import { RESPONSE_LIST_KEY, RESPONSE_OBJ_KEY } from '@/shared/constants';
import { toast } from 'sonner';

type ValueType<T> = T[] | T | BaseResponseType<T> | null;

export const useAxios = {
  get: async <TData, TResponse, T>(url: string, params: T | object = {}) => {
    return await axiosConfig.get<TData, TResponse>(url, {
      params: params,
    });
  },
  post: async <TData, TResponse, T>(url: string, body: T) => {
    return await axiosConfig.post<TData, TResponse>(url, body);
  },
  put: async <TData, TResponse, T>(url: string, body: T) => {
    return await axiosConfig.put<TData, TResponse>(url, body);
  },
  delete: async <TData, TResponse>(url: string) => {
    return await axiosConfig.delete<TData, TResponse>(url);
  },
  getResponse: <T>(
    response: BaseResponseType<T>,
    type: 'list' | 'object' | 'error' = 'list'
  ): ValueType<T> => {
    if (type === 'error') {
      const messages = get(response, 'messages', []);
      if (messages.length) {
        toast.error(messages.join(', '));
      }
      return response;
    }

    if (type === 'list') {
      return get(response, RESPONSE_LIST_KEY, []) as T[];
    }
    return get(response, RESPONSE_OBJ_KEY, null) as T;
  },
};
