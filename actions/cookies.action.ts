'use server';

import { cookies } from 'next/headers';
import { decrypt } from '@/shared/lib/session';
import { CookieEnums } from '@/shared/enums';
import { getUserInfo } from '@/services/user.service';
import { User } from '@/types/user.type';

export const getSession = async () => {
  const cookie = (await cookies()).get(CookieEnums.SESSION_ID)?.value;
  return await decrypt(cookie);
};

export const getToken = async () => {
  return (await cookies()).get(CookieEnums.TOKEN)?.value;
};

export const getLocale = async () => {
  return (await cookies()).get(CookieEnums.NEXT_LOCALE)?.value;
};

export const getUserInfoLogin = async () => {
  const session = await getSession();
  const response = await getUserInfo(String(session?.userName) || '');
  if (response.type === 'error') {
    return false;
  }
  const user = response.result as User;
  return user?.roleCode === session?.roleCode;
};
