'use client';

import { HTMLAttributes, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginSchema } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/app/[locale]/(guest)/login/_hooks/use-login';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export function LoginForm({
  className,
  ...props
}: Readonly<HTMLAttributes<HTMLDivElement>>) {
  const t = useTranslations('LoginMessages');
  const tCommon = useTranslations('CommonMessages');

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: '',
      password: '',
    },
  });

  const { mutateAsync, status } = useLogin(tCommon);

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    await mutateAsync(data);
  };

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  });

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-4">
              <FormField
                name="userName"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>{t('form.username')}</FormLabel>
                      <Input
                        id="userName"
                        placeholder={t('form.username')}
                        type="text"
                        autoCapitalize="none"
                        autoCorrect="off"
                        hasError={!!form.formState?.errors.userName}
                        {...field}
                      />
                    </FormItem>
                    <FormMessage namespace={'LoginMessages'} />
                  </>
                )}
              />
              <FormField
                name="password"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>{t('form.password')}</FormLabel>
                      <Input
                        id="password"
                        placeholder={t('form.password')}
                        type="password"
                        autoCapitalize="none"
                        autoCorrect="off"
                        hasError={!!form.formState.errors.password}
                        {...field}
                      />
                    </FormItem>
                    <FormMessage namespace={'LoginMessages'} />
                  </>
                )}
              />
            </div>
            <Button
              disabled={status === 'pending'}
              loading={status === 'pending'}
              type="submit"
              variant="ringHover"
            >
              {t('form.submit')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
