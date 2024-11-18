'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { login } from '@/services/login.service';
import get from 'lodash/get';
import { LoginResponseType, UserLoginRequestType } from '@/types/user.type';
import { loginAction } from '@/actions/login.action';
import { pageRoutes } from '@/shared/routes/pages.route';
import { useRouter } from '@/shared/configs/i18n/routing';
import { useUserStore } from '@/states/common.state';
import { RESPONSE_OBJ_KEY } from '@/shared/constants';

export const useLogin = (t: any) => {
  const router = useRouter();
  const { setUserInfo } = useUserStore();
  return useMutation({
    mutationFn: async (loginInfo: UserLoginRequestType) =>
      await login(loginInfo),
    onSuccess: async (response) => {
      if (response.type === 'error') {
        const message = get(response, 'result.messages[0]', t('loginFailed'));
        toast.error(message);
        return;
      }

      toast.success(t('loginSuccess'));
      const userLoginInfo = get(
        response,
        RESPONSE_OBJ_KEY,
        null
      ) as LoginResponseType;

      await loginAction(userLoginInfo);
      setUserInfo({
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
