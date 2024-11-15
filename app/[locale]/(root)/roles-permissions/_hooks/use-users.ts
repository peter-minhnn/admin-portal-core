import { useQuery } from '@tanstack/react-query'
import get from 'lodash/get'
import { getUserFilters } from '@/services/user.service'
import { User } from '@/types/user.type'

export const useGetUsersByRole = (roleCode: string) => {
    return useQuery({
        queryKey: ['users', roleCode],
        queryFn: async () => await getUserFilters({ roleCode }),
        select: (data) => get(data, 'result.data', []) as User[],
        refetchOnWindowFocus: false,
    })
}
