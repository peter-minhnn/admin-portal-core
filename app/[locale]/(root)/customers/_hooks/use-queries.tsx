//-------------------------------------CUSTOMER HOOKS-------------------------------------
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { resetPassword, updateCustomer } from '@/services/customer.service';
import {
  CustomerFormData,
  CustomerResetPwdFormData,
} from '@/types/customer.type';
import { handleQueryResponse } from '@/services/api.service';

export const useUpdateCustomer = (t: any, closeModal: () => void) => {
  return useMutation({
    mutationFn: async (product: CustomerFormData) =>
      await updateCustomer(product),
    onSuccess: (response) =>
      handleQueryResponse(
        response,
        t('notifications.updateCustomerSuccess'),
        closeModal
      ),
    onError: () => toast.error(t('notifications.updateCustomerError')),
  });
};

export const useCustomerResetPassword = (
  t: any,
  callback: (data: any) => void
) => {
  return useMutation({
    mutationFn: async (customerInfo: CustomerResetPwdFormData) =>
      await resetPassword(customerInfo),
    onSuccess: (response) =>
      handleQueryResponse(
        response,
        t('notifications.resetCustomerPasswordSuccess'),
        callback
      ),
    onError: () => toast.error(t('notifications.resetCustomerPasswordError')),
  });
};
