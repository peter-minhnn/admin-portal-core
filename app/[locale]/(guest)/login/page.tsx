import { LoginForm } from "@/app/[locale]/(guest)/login/login-form";
import Image from "next/image";
import {useTranslations} from "next-intl";
import {getTranslations} from "next-intl/server";
import {metaObject} from "@/shared/configs";

export async function generateMetadata() {
  "use server";
  const t = await getTranslations('metaDataMessages');

  return {
    ...metaObject(t('loginTitle')),
  };
}

export default function AuthenticationPage() {
  const t = useTranslations("loginMessages");
  return (
    <main className="max-h-screen">
      <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-[#9FBD48]" />
          <div className="relative z-20 flex items-center text-lg font-bold text-[#3C603C]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            {t("webName")}
          </div>
          <Image
            src="/images/logo-freshbunpho.jpg"
            alt="logo"
            width={2542}
            height={2560}
            fetchPriority="high"
            priority
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
        <div className="lg:p-8 h-full flex justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {t("welcome")}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t("hint")}
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
