import globalAxiosInstance from '@/shared/configs/axios.config'
import { BaseResponseType, ListResponseType } from '@/types/common.type'
import { apiRoutes } from '@/shared/routes/api.route'
import {
    handleApiCatchResponse,
    handleApiResponse,
} from '@/services/api.service'
import { Role } from '@/types/roles-permissions.type'

export const getRoles = async () => {
    try {
        const response = await globalAxiosInstance.get<null, BaseResponseType>(
            apiRoutes.rolesPermissions.getRoles
        )
        return handleApiResponse<ListResponseType<Role>>(response)
    } catch (e) {
        return handleApiCatchResponse(e)
    }
}
