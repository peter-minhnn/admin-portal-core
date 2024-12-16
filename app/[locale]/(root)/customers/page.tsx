import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { metaObject } from '@/shared/configs';
import LayoutContentSection from '@/components/layouts/layout-section';
import CustomerList from '@/app/[locale]/(root)/customers/_components/customer-list';

export async function generateMetadata() {
  'use server';
  const t = await getTranslations('MetaDataMessages');
  return {
    ...metaObject(t('customerTitle')),
  };
}

export default function CustomerPage() {
  const t = useTranslations('CustomerMessages');
  return (
    <LayoutContentSection title={t('title')} desc={t('description')}>
      <CustomerList />
    </LayoutContentSection>
  );
}
