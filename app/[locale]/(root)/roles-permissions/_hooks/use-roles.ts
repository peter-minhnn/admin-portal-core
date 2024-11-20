import { useQuery } from '@tanstack/react-query';
import get from 'lodash/get';
import { getRoles } from '@/services/role-permission.service';
import { RESPONSE_LIST_KEY } from '@/shared/constants';

export const useGetRoles = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: async () => await getRoles(),
    select: (data) => get(data.result, RESPONSE_LIST_KEY, []),
    refetchOnWindowFocus: false,
  });
};
