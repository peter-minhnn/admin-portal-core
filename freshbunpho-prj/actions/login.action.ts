"use server";

import { z } from "zod";
import { createSession, deleteSession } from "@/shared/lib/session";
import { redirect } from "next/navigation";
import { loginMessages } from "@/shared/messages";

const testUser = {
  id: "1",
  phone: "0764849787",
  password: "111111",
};

const loginSchema = z.object({
  phone: z.string().min(1, { message: loginMessages.errors.phone }).trim(),
  password: z
    .string()
    .min(1, { message: loginMessages.errors.password })
    .trim(),
});

export const login = async (prevState: any, formData: FormData) => {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { phone, password } = result.data;

  if (phone !== testUser.phone || password !== testUser.password) {
    return {
      errors: {
        password: [loginMessages.errors.invalid],
      },
    };
  }

  await createSession(testUser.id);

  redirect("/dashboard");
};

export const logout = async () => {
  await deleteSession();
  redirect("/login");
};
