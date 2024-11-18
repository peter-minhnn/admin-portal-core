import React from 'react';
import { cn } from '@/shared/lib';
import { pageRoutes } from '@/shared/routes/pages.route';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { metaObject } from '@/shared/configs';
import { Link } from '@/shared/configs/i18n/routing';

export async function generateMetadata() {
  'use server';
  const t = await getTranslations('MetaDataMessages');

  return {
    ...metaObject(t('internalServerError')),
  };
}

export default function InternalServerError() {
  const t = useTranslations('CommonMessages');

  return (
    <div className={cn('h-svh w-full')}>
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">500</h1>
        <span className="font-medium">
          {t('pageErrorTitle')} {`:')`}
        </span>
        <p
          className="text-center text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: t('pageErrorDescription', { br: '<br/>' }),
          }}
        ></p>
        <div className="mt-6 flex gap-4">
          <Link href={pageRoutes.dashboard} title={t('backToHome')}>
            {t('backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
