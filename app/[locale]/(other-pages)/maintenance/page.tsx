import { buttonVariants } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { metaObject } from '@/shared/configs';
import { Link } from '@/shared/configs/i18n/routing';
import { pageRoutes } from '@/shared/routes/pages.route';
import { cn } from '@/shared/lib';

export async function generateMetadata() {
  'use server';
  const t = await getTranslations('MetaDataMessages');

  return {
    ...metaObject(t('maintenance')),
  };
}

export default function MaintenanceError() {
  const t = useTranslations('ErrorMessages');
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">503</h1>
        <span className="font-medium">{t('title503')}</span>
        <p
          className="text-center text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: t('description503', { br: '<br />' }),
          }}
        ></p>
        <div className="mt-6 flex gap-4">
          <Link
            title={t('tryAgainBtn')}
            href={pageRoutes.dashboard}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm',
              })
            )}
          >
            {t('tryAgainBtn')}
          </Link>
        </div>
      </div>
    </div>
  );
}
