import { BaseResponseType } from '@/types/common.type';
import { useAxios } from '@/hooks/use-axios';
import { apiRoutes } from '@/shared/routes/api.route';
import {
  handleApiCatchResponse,
  handleApiResponse,
} from '@/services/api.service';
import {
  CustomerFormData,
  CustomerResetPwdFormData,
} from '@/types/customer.type';
import globalAxiosInstance from '@/shared/configs/axios.config';

export const updateCustomer = async (data: CustomerFormData) => {
  try {
    const response = await useAxios.put<
      null,
      BaseResponseType,
      CustomerFormData
    >(apiRoutes.customers.customer, data);
    return handleApiResponse<CustomerFormData>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};

export const resetPassword = async (data: CustomerResetPwdFormData) => {
  try {
    const response = await useAxios.post<
      null,
      BaseResponseType,
      CustomerResetPwdFormData
    >(apiRoutes.customers.resetPassword, data);
    return handleApiResponse<CustomerResetPwdFormData>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};

export const downloadFile = async () => {
  try {
    return await globalAxiosInstance.get(apiRoutes.customers.export, {
      responseType: 'blob',
    });
  } catch (err) {
    console.log('[ERROR - CUSTOMER] [downloadFile]: ', err);
  }
};
