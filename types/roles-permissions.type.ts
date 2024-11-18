import { User, UserRolePagesType } from '@/types/user.type';
import { z } from 'zod';
import { UpdateRoleFormSchema } from '@/app/[locale]/(root)/roles-permissions/schema';

export type Role = {
  isActive: boolean;
  createdAt: Date | null;
  roleCode: string;
  roleName: string;
  companyId: number;
  color: string;
  users: User[];
  pages: UserRolePagesType[];
};

export type UpdateRoleFormData = z.infer<typeof UpdateRoleFormSchema>;
