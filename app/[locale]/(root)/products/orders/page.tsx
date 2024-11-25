import { getTranslations } from 'next-intl/server';
import { metaObject } from '@/shared/configs';
import { useTranslations } from 'next-intl';
import LayoutContentSection from '@/components/layouts/layout-section';
import ProductOrderList from './_components/product-order-list';

export async function generateMetadata() {
  'use server';
  const t = await getTranslations('MetaDataMessages');
  return {
    ...metaObject(t('productOrderTitle')),
  };
}

export default function ProductOrderPage() {
  const t = useTranslations('ProductMessages');
  return (
    <LayoutContentSection
      title={t('orders.title')}
      desc={t('orders.description')}
    >
      <ProductOrderList />
    </LayoutContentSection>
  );
}
