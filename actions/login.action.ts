"use server";

import { redirect } from "next/navigation";
import { pageRoutes } from "@/shared/routes/pages.route";
import { createSession, deleteSession } from "@/shared/lib/session";
import { StatusCodes } from "@/shared/enums";
import { LoginResponseType } from "@/types/user.type";

export const loginAction = async (result: LoginResponseType) => {
  await createSession(result.access_token, result.user);
};

export const logout = async () => {
  await deleteSession();
  redirect(pageRoutes.auth.login);
};

export const redirectPageErrors = async (e: any) => {
  switch (e?.status) {
    case StatusCodes.NOT_FOUND:
      return redirect(pageRoutes.notFound);
    case StatusCodes.UNAUTHORIZED:
      await logout();
      break;
    case StatusCodes.SERVICE_UNAVAILABLE:
      return redirect(pageRoutes.maintenance);
    case StatusCodes.INTERNAL_SERVER_ERROR:
      return redirect(pageRoutes.internalServerError);
    default:
      break;
  }
};
