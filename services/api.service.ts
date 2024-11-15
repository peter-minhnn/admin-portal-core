import { BaseResponseType, ResultType } from '@/types/common.type'
import get from 'lodash/get'
import { StatusCodes } from '@/shared/enums'
import { redirectPageErrors } from '@/actions/login.action'

export function handleApiResponse<T>(response: BaseResponseType) {
    const errorResponse = get(response, 'data.code', null)
    if (!errorResponse) {
        return {
            type: 'success',
            result: response.data.data as T,
        }
    }

    return {
        type: 'error',
        result: {
            data: null,
            isSuccess: false,
            messages: get(response, 'data.messages', []),
            statusCode: response.data?.statusCode ?? StatusCodes.BAD_REQUEST,
        },
    }
}

export async function handleApiCatchResponse(e: any): Promise<ResultType> {
    await redirectPageErrors(e)

    const messageError = get(e.response, 'data.messages', [])
    return {
        type: 'error',
        result: {
            isSuccess: false,
            message: messageError.join() ?? 'Something went wrong',
            statusCode: e?.status ?? StatusCodes.INTERNAL_SERVER_ERROR,
            data: null,
        },
    }
}
