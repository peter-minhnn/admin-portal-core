import ProductList from '../_components/product-list';
import { getTranslations } from 'next-intl/server';
import { metaObject } from '@/shared/configs';
import { useTranslations } from 'next-intl';
import LayoutContentSection from '@/components/layouts/layout-section';

export async function generateMetadata() {
  'use server';
  const t = await getTranslations('MetaDataMessages');
  return {
    ...metaObject(t('productsTitle')),
  };
}

export default function ProductListPage() {
  const t = useTranslations('ProductMessages');
  return (
    <LayoutContentSection title={t('title')} desc={t('description')}>
      <ProductList />
    </LayoutContentSection>
  );
}
