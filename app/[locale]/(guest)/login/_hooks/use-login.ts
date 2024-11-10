import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoginType } from "@/types/login.type";
import { login } from "@/services/login.service";
import get from "lodash/get";
import { LoginResponseType } from "@/types/user.type";
import {loginAction} from "@/actions/login.action";

export const useLogin = (t: any) => {
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
    },
    onError: () => toast.error(t("somethingWentWrong")),
  });
};
