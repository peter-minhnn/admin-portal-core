import { z } from "zod";

export const loginSchema = z.object({
  userName: z.string().min(1).trim(),
  password: z.string().min(1).trim(),
  unauthorized: z.string().optional(),
});
