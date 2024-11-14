import { z } from "zod";

export const loginSchema = z.object({
  userName: z.string().min(1, {message: "errors.username"}).trim(),
  password: z.string().min(1, {message: "errors.password"}).trim(),
  unauthorized: z.string().optional(),
});
