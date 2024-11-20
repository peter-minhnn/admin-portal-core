import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import get from 'lodash/get';
import { getUserFilters, updateUser } from '@/services/user.service';
import { User } from '@/types/user.type';
import { toast } from 'sonner';
import { RESPONSE_LIST_KEY } from '@/shared/constants';

export const useGetUsersByRole = (roleCode: string) => {
  return useQuery({
    queryKey: ['users', roleCode],
    queryFn: async () => await getUserFilters({ roleCode }),
    select: (data) => get(data.result, RESPONSE_LIST_KEY, []) as User[],
    refetchOnWindowFocus: false,
  });
};

export const useUpdateUserRole = (t: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: User) => await updateUser(user),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['roles'],
      });
    },
    onSuccess: () =>
      toast.success(t('notifications.updateProductPriceSuccess')),
    onError: () => toast.error(t('notifications.updateProductPriceError')),
  });
};
