"use server";

import { cookies } from "next/headers";
import { decrypt } from "@/shared/lib/session";
import { CookieEnums } from "@/shared/enums";

export const getSession = async () => {
  const cookie = (await cookies()).get(CookieEnums.SESSION_ID)?.value;
  return await decrypt(cookie);
};

export const getToken = async () => {
  return (await cookies()).get(CookieEnums.TOKEN)?.value;
};
