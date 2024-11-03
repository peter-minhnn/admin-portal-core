import { BaseResponseType } from "@/types/common.type";
import axiosConfig from "@/shared/api/axios.config";

export const useAxios = {
  get: async <T>(url: string, params: T | Object = {}) => {
    return await axiosConfig.get<BaseResponseType<T>>(url, { params: params });
  },
  post: async <T>(url: string, body: T) => {
    return await axiosConfig.post<BaseResponseType<T>>(url, body);
  },
  put: async <T>(url: string, body: T) => {
    return await axiosConfig.put<BaseResponseType<T>>(url, body);
  },
  delete: async <T>(url: string) => {
    return await axiosConfig.delete<BaseResponseType<T>>(url);
  },
};
