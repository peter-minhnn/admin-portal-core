"use client";

import { HTMLAttributes, useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/shared/lib";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/actions";
import { loginMessages } from "@/shared/messages";
import get from "lodash/get";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const { pending } = useFormStatus();
  const [state, loginAction] = useActionState(login, undefined);

  // useEffect(() => {
  //   document.body.classList.add("overflow-hidden");
  //   return () => {
  //     document.body.classList.remove("overflow-hidden");
  //   };
  // });

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form action={loginAction}>
        <div className="grid gap-4">
          <div className="grid gap-4">
            <Label className="sr-only" htmlFor="phone">
              {loginMessages.form.phone}
            </Label>
            <Input
              id="phone"
              name="phone"
              placeholder={loginMessages.form.phone}
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={pending}
              errorMessage={get(state?.errors, "phone", "")}
            />
            <Input
              id="password"
              name="password"
              placeholder={loginMessages.form.password}
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={pending}
              errorMessage={get(state?.errors, "password", "")}
            />
          </div>
          <Button disabled={pending} loading={pending} type="submit">
            {loginMessages.form.submit}
          </Button>
        </div>
      </form>
    </div>
  );
}
