export const PAGE_SIZE = 50;

export enum LocalStorageEnums {
  LOCALE = 'locale',
}

export enum CookieEnums {
  SESSION_ID = 'session_id',
  TOKEN = 'access_token',
  NEXT_LOCALE = 'NEXT_LOCALE',
}

export enum StatusCodes {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export enum Gender {
  MALE = 1,
  FEMALE = 2,
  OTHER = 0,
}
