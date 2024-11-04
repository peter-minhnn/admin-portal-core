"use server";

import { z } from "zod";
import { createSession, deleteSession } from "@/shared/lib/session";
import { redirect } from "next/navigation";
import { pageRoutes } from "@/shared/routes/pages.route";
import {isEqual} from "lodash";
import {getTranslations} from "next-intl/server";

const testUser = {
  id: "1",
  phone: "0764849787",
  password: "111111",
};

const loginSchema = z.object({
  phone: z.string().min(1).trim(),
  password: z.string().min(1).trim(),
});

export const login = async (prevState: unknown, formData: FormData) => {
  const t = await getTranslations("loginMessages");

  const result = await loginSchema.safeParseAsync(Object.fromEntries(formData), {
        errorMap(issue, ctx) {
          let message: string = "";

          if (isEqual(issue.path, ['phone'])) {
            message = t('errors.phone');
          } else if (isEqual(issue.path, ['password'])) {
            message = t('errors.password');
          }

          return {message: message ?? ctx.defaultError};
        }
      });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { phone, password } = result.data;

  if (phone !== testUser.phone || password !== testUser.password) {
    return {
      errors: {
        password: [t("errors.invalid")],
      },
    };
  }

  await createSession(testUser.phone);

  redirect(pageRoutes.dashboard);
};

export const logout = async () => {
  await deleteSession();
  redirect(pageRoutes.auth.login);
};
