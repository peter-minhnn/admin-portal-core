import { BaseResponseType } from '@/types/common.type';
import { useAxios } from '@/hooks/use-axios';
import { apiRoutes } from '@/shared/routes/api.route';
import {
  handleApiCatchResponse,
  handleApiResponse,
} from '@/services/api.service';
import { CustomerFormData } from '@/types/customer.type';

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
