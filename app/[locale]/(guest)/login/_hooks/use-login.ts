'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { login } from '@/services/login.service';
import { LoginResponseType, UserLoginRequestType } from '@/types/user.type';
import { loginAction } from '@/actions/login.action';
import { pageRoutes } from '@/shared/routes/pages.route';
import { useRouter } from '@/shared/configs/i18n/routing';
import { useUserStore } from '@/states/common.state';
import { useAxios } from '@/hooks/use-axios';
import get from 'lodash/get';

export const useLogin = (t: any) => {
  const router = useRouter();
  const { setUserInfo, userInfo } = useUserStore();
  return useMutation({
    mutationFn: async (loginInfo: UserLoginRequestType) => {
      setUserInfo({
        userName: loginInfo.userName,
        pwd: loginInfo.password,
      });
      return await login<LoginResponseType>(loginInfo);
    },
    onSuccess: async (response) => {
      const isSuccess = get(response.result, 'isSuccess', false);
      if (!isSuccess) {
        const message = get(response.result, 'messages[0]', '');
        toast.error(message ?? t('loginFailed'));
        return;
      }

      toast.success(t('loginSuccess'));
      const userLoginInfo = useAxios.getResponse<LoginResponseType>(
        response.result,
        'object'
      ) as LoginResponseType;

      await loginAction({
        ...userLoginInfo,
        user: { ...userLoginInfo.user, pwd: userInfo?.pwd },
      });
      setUserInfo({
        ...userInfo,
        userName: userLoginInfo.user.userName,
        roleCode: userLoginInfo.user.roleCode,
        companyId: userLoginInfo.user.companyId,
        role: userLoginInfo.user.role,
      });
      router.push(pageRoutes.dashboard);
    },
    onError: (e) => {
      console.log('LOGIN ERROR', e);
      toast.error(t('loginFailed'));
    },
  });
};
