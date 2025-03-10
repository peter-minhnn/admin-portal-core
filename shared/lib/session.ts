import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { CookieEnums } from '@/shared/enums';
import { AuthUserType } from '@/types/user.type';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(accessToken: string, user: AuthUserType) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({
    user: {
      userName: user.userName,
      pwd: user.pwd,
      roleCode: user.roleCode,
      companyId: user.companyId,
      role: user.role,
    },
    expiresAt,
  });

  (await cookies()).set(CookieEnums.SESSION_ID, session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
  (await cookies()).set(CookieEnums.TOKEN, accessToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteSession() {
  (await cookies()).delete(CookieEnums.SESSION_ID);
  (await cookies()).delete(CookieEnums.TOKEN);
}

type SessionPayload = {
  user: AuthUserType;
  access_token?: string;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch {
    console.log('Failed to verify session');
    return null;
  }
}
