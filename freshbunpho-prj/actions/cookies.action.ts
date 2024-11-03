"use server";

import { cookies } from "next/headers";
import { decrypt } from "@/shared/lib/session";

export const getSession = async () => {
  const cookie = (await cookies()).get("session")?.value;
  return await decrypt(cookie);
};
