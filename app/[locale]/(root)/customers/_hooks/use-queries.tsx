//-------------------------------------CUSTOMER HOOKS-------------------------------------
import { useMutation } from '@tanstack/react-query';
import get from 'lodash/get';
import { toast } from 'sonner';
import { updateCustomer } from '@/services/customer.service';
import { CustomerFormData } from '@/types/customer.type';

export const useUpdateCustomer = (t: any, closeModal: () => void) => {
  return useMutation({
    mutationFn: async (product: CustomerFormData) =>
      await updateCustomer(product),
    onSuccess: (response) => {
      const message = get(
        response,
        'result.messages[0]',
        t('notifications.updateCustomerSuccess')
      );
      if (!response.result.isSuccess) {
        toast.error(message);
        return;
      }
      toast.success(message);
      closeModal();
    },
    onError: () => toast.error(t('notifications.updateCustomerError')),
  });
};
