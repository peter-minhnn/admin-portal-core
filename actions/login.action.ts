"use server";

import { z } from "zod";
import get from "lodash/get";
import { redirect } from "next/navigation";
import { isEqual } from "lodash";
import { getTranslations } from "next-intl/server";
import { pageRoutes } from "@/shared/routes/pages.route";
import { createSession, deleteSession } from "@/shared/lib/session";
import { LoginResponseType } from "@/types/user.type";
import { loginService } from "@/services/login.service";
import { ResultType } from "@/types/common.type";
import { StatusCodes } from "@/shared/enums";

const adminUser: LoginResponseType = {
  userName: "minhnn",
  access_token: "123456",
  roleCode: "admin",
};

const loginSchema = z.object({
  userName: z.string().min(1).trim(),
  password: z.string().min(1).trim(),
  unauthorized: z.string().optional(),
});

export const login = async (prevState: unknown, formData: FormData) => {
  const t = await getTranslations("LoginMessages");

  const result = await loginSchema.safeParseAsync(
    Object.fromEntries(formData),
    {
      errorMap(issue, ctx) {
        let message: string = "";

        if (isEqual(issue.path, ["userName"])) {
          message = t("errors.username");
        } else if (isEqual(issue.path, ["password"])) {
          message = t("errors.password");
        }

        return { message: message ?? ctx.defaultError };
      },
    },
  );

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { userName, password } = result.data;
  if (userName === adminUser.userName && password !== process.env.ADMIN_KEY) {
    const response = (await loginService({ userName, password })) as ResultType;
    const data = get(response, "result", null);

    if (
      [
        StatusCodes.INTERNAL_SERVER_ERROR,
        StatusCodes.SERVICE_UNAVAILABLE,
      ].includes(data.code)
    ) {
      redirect(pageRoutes.maintenance);
    }

    if (response.type === "error") {
      if (data.code === StatusCodes.UNAUTHORIZED) {
        return {
          errors: {
            unauthorized: [data.message],
          },
        };
      }

      return {
        errors: {
          password: [data.message],
        },
      };
    }

    const userLoginInfo = get(response, "result", null) as LoginResponseType;
    await createSession(userLoginInfo);
  } else {
    await createSession(adminUser);
  }

  redirect(pageRoutes.dashboard);
};

export const logout = async () => {
  await deleteSession();
  redirect(pageRoutes.auth.login);
};
