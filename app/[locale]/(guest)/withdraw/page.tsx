'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import ReactImage from '@/components/ui/image';
import { useTranslations } from 'next-intl';

const FormSchema = z.object({
  username: z.string().min(1, {
    message: 'errors.username',
  }),
  password: z.string().min(1, {
    message: 'errors.password',
  }),
});

export default function UserWithdrawForm() {
  const t = useTranslations('LoginMessages');
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  function onSubmit() {
    toast.success('Form submitted successfully.');
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="lg:p-8 h-full flex flex-col justify-center w-full min-h-screen relative">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {t('withdraw')}
              </h1>
              <div className="flex items-center justify-center text-lg font-bold text-[#3C603C]">
                <ReactImage
                  src="/images/langgao-logo.svg"
                  alt="logo"
                  width={50}
                  height={50}
                  fetchPriority="high"
                  priority
                  className="absolute inset-0 object-cover w-full h-full"
                />
                {t('webName')}
              </div>
              <p className="text-sm text-muted-foreground">
                {t('withdrawHint')}
              </p>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-4">
                <FormField
                  name="username"
                  control={form.control}
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
                          {...field}
                        />
                      </FormItem>
                      <FormMessage namespace={'LoginMessages'} />
                    </>
                  )}
                />
                <FormField
                  name="password"
                  control={form.control}
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
                          {...field}
                        />
                      </FormItem>
                      <FormMessage namespace={'LoginMessages'} />
                    </>
                  )}
                />
              </div>
              <Button type="submit" variant="blueShine">
                {t('withdrawBtn')}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
