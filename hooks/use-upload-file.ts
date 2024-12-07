import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { uploadFile } from '@/services/file.service';

export const useUploadFile = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return await uploadFile(formData);
    },
    onError: () => toast.error('Upload Error'),
  });
};
