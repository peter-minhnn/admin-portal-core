import globalAxiosInstance from '@/shared/configs/axios.config';
import { BaseResponseType } from '@/types/common.type';
import { apiRoutes } from '@/shared/routes/api.route';
import {
  handleApiCatchResponse,
  handleApiResponse,
} from '@/services/api.service';
import { FileType } from '@/types/file.type';

export const uploadFile = async (formData: FormData) => {
  try {
    const response = await globalAxiosInstance.post<null, BaseResponseType>(
      apiRoutes.uploadFile.post,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return handleApiResponse<FileType>(response);
  } catch (e) {
    return handleApiCatchResponse(e);
  }
};
