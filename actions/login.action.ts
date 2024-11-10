"use server";

import { redirect } from "next/navigation";
import { pageRoutes } from "@/shared/routes/pages.route";
import {createSession, deleteSession} from "@/shared/lib/session";
import { StatusCodes } from "@/shared/enums";
import {LoginResponseType} from "@/types/user.type";

export const loginAction = async (user: LoginResponseType) => {
    await createSession(user);
    redirect(pageRoutes.dashboard);
};

export const logout = async () => {
    await deleteSession();
    redirect(pageRoutes.auth.login);
};

export const redirectPageErrors = async (e: any) => {
    if (e?.status === StatusCodes.SERVICE_UNAVAILABLE) {
        redirect(pageRoutes.maintenance);
    }

    if (e?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
        redirect(pageRoutes.internalServerError);
    }
};