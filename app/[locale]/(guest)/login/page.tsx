import { LoginForm } from './_components/login-form';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { metaObject } from '@/shared/configs';
import ReactImage from '@/components/ui/image';

export async function generateMetadata() {
  'use server';
  const t = await getTranslations('MetaDataMessages');

  return {
    ...metaObject(t('loginTitle')),
  };
}

export default function AuthenticationPage() {
  const t = useTranslations('LoginMessages');
  return (
    <main className="max-h-screen">
      <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-[#9FBD48]" />
          <ReactImage
            src="/images/logo.svg"
            alt="logo"
            fill
            sizes="(max-width: 640px) 100vw, 640px"
            fetchPriority="high"
            priority
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
        <div className="lg:p-8 h-full flex flex-col justify-center w-full min-h-screen relative">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {t('welcome')}
              </h1>
              <div className="flex items-center justify-center text-lg font-bold text-[#3C603C]">
                <ReactImage
                  src="/images/logo.svg"
                  alt="logo"
                  width={50}
                  height={50}
                  fetchPriority="high"
                  priority
                  className="absolute inset-0 object-cover w-full h-full"
                />
                {t('webName')}
              </div>
              <p className="text-sm text-muted-foreground">{t('hint')}</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
