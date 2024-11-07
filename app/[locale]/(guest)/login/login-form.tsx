"use client";

import { HTMLAttributes, useActionState, useEffect } from "react";
import Form from "next/form";
import { useFormStatus } from "react-dom";
import get from "lodash/get";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/actions/login.action";

export function LoginForm({
  className,
  ...props
}: Readonly<HTMLAttributes<HTMLDivElement>>) {
  const { pending } = useFormStatus();
  const [state, loginAction] = useActionState(login, undefined);
  const t = useTranslations("LoginMessages");

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  });

  useEffect(() => {
    if (state?.errors?.unauthorized) {
      toast.error(String(state?.errors?.unauthorized));
    }
  }, [state]);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form action={loginAction}>
        <div className="grid gap-4">
          <div className="grid gap-4">
            <Label className="sr-only" htmlFor="userName">
              {t("form.username")}
            </Label>
            <Input
              id="userName"
              name="userName"
              placeholder={t("form.username")}
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={pending}
              errorMessage={get(state?.errors, "userName", "")}
            />
            <Input
              id="password"
              name="password"
              placeholder={t("form.password")}
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={pending}
              errorMessage={get(state?.errors, "password", "")}
            />
          </div>
          <Button disabled={pending} loading={pending} type="submit">
            {t("form.submit")}
          </Button>
        </div>
      </Form>
    </div>
  );
}
