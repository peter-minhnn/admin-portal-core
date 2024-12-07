'use server';

import { redirect } from 'next/navigation';
import { pageRoutes } from '@/shared/routes/pages.route';
import { createSession, deleteSession } from '@/shared/lib/session';
import { LoginResponseType } from '@/types/user.type';

export const loginAction = async (result: LoginResponseType) => {
  await createSession(result.access_token, result.user);
};

export const logout = async () => {
  await deleteSession();
  redirect(pageRoutes.auth.login);
};
