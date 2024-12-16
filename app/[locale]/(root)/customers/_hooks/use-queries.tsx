//-------------------------------------CUSTOMER HOOKS-------------------------------------
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@/types/common.type';
import { getCustomers } from '@/services/product.service';

export const useGetCustomers = (pagination: PaginationState) => {
  return useQuery({
    queryKey: ['customers', pagination],
    queryFn: async () => await getCustomers(pagination),
    refetchOnWindowFocus: false,
  });
};
