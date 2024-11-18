import { z } from 'zod';

export const UpdateRoleFormSchema = z.object({
  role: z.object(
    {
      roleCode: z.string(),
    },
    {
      message: 'Role is required',
    }
  ),
});
