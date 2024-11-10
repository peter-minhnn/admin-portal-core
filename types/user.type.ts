export type UserType = {
  id?: number;
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  phoneNumber?: string;
  roleCode?: string;
  companyId?: number;
  rolePages: RolePageType[];
};

export type UserLoginType = {
  userName: string;
  password: string;
};

export type LoginResponseType = {
  access_token: string;
  userName: string;
  roleCode: string;
  companyId?: number;
  rolePages: RolePageType[];
};

export type RolePageType = {
  roleCode: string;
  pageCode: string;
  pageName: string;
  pageUrl: string;
};
