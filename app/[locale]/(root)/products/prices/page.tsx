import { getTranslations } from 'next-intl/server';
import { metaObject } from '@/shared/configs';
import { useTranslations } from 'next-intl';
import LayoutContentSection from '@/components/layouts/layout-section';
import ProductPriceList from './_components/product-price-list';

export async function generateMetadata() {
  'use server';
  const t = await getTranslations('MetaDataMessages');
  return {
    ...metaObject(t('productPriceTitle')),
  };
}

export default function ProductPrice() {
  const t = useTranslations('ProductMessages');
  return (
    <LayoutContentSection
      title={t('productPriceTitle')}
      desc={t('productPriceDescTitle')}
    >
      <ProductPriceList />
    </LayoutContentSection>
  );
}
