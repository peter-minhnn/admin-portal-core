//-------------------------------------CUSTOMER HOOKS-------------------------------------
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  createCustomer,
  resetPassword,
  updateCustomer,
} from '@/services/customer.service';
import { CustomerResetPwdFormData, CustomerType } from '@/types/customer.type';
import { handleQueryResponse } from '@/services/api.service';

export const useUpdateCustomer = (
  t: any,
  closeModal: (isRefresh: boolean) => void
) => {
  return useMutation({
    mutationFn: async (product: CustomerType) => await updateCustomer(product),
    onSuccess: (response) =>
      handleQueryResponse(
        response,
        t('notifications.updateCustomerSuccess'),
        () => closeModal(true)
      ),
    onError: () => toast.error(t('notifications.updateCustomerError')),
  });
};

export const useCustomerResetPassword = (
  t: any,
  callback: (value: boolean) => void
) => {
  return useMutation({
    mutationFn: async (customerInfo: CustomerResetPwdFormData) =>
      await resetPassword(customerInfo),
    onSuccess: (response) =>
      handleQueryResponse(
        response,
        t('notifications.resetCustomerPasswordSuccess'),
        () => callback(true)
      ),
    onError: () => toast.error(t('notifications.resetCustomerPasswordError')),
  });
};

export const useCreateCustomer = (
  t: any,
  callback: (data: CustomerType) => void
) => {
  return useMutation({
    mutationFn: async (product: CustomerType) => await createCustomer(product),
    onSuccess: (response) =>
      handleQueryResponse(
        response,
        t('notifications.updateCustomerSuccess'),
        callback
      ),
    onError: () => toast.error(t('notifications.updateCustomerError')),
  });
};
