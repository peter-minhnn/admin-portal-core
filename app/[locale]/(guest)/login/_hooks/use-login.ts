"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoginType } from "@/types/login.type";
import { login } from "@/services/login.service";
import get from "lodash/get";
import { LoginResponseType } from "@/types/user.type";
import { loginAction } from "@/actions/login.action";
import { pageRoutes } from "@/shared/routes/pages.route";
import { useRouter } from "@/shared/configs/i18n/routing";
import { useUserStore } from "@/states/common.state";

export const useLogin = (t: any) => {
  const router = useRouter();
  const { setUserInfo } = useUserStore();
  return useMutation({
    mutationFn: async (loginInfo: LoginType) => await login(loginInfo),
    onSuccess: async (response) => {
      const data = get(response, "result", null);
      if (response.type === "error") {
        toast.error(data.message);
        return;
      }

      toast.success(t("loginSuccess"));
      const userLoginInfo = get(response, "result", null) as LoginResponseType;
      await loginAction(userLoginInfo);
      setUserInfo({
        userName: userLoginInfo.userName,
        roleCode: userLoginInfo.roleCode,
        companyId: userLoginInfo.companyId,
        rolePages: userLoginInfo.rolePages,
      });
      router.push(pageRoutes.dashboard);
    },
    onError: (e) => {
      console.log("LOGIN ERROR", e);
      toast.error(t("loginFailed"));
    },
  });
};
