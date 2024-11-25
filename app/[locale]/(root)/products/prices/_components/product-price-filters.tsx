import React, { useEffect, useState } from 'react';
import { ProductPriceFilterParams, ProductType } from '@/types/product.type';
import { useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IconRefresh } from '@tabler/icons-react';
import { Label } from '@/components/ui/label';
import { useGetProducts } from '@/app/[locale]/(root)/products/_hooks/use-queries';
import { PaginationState } from '@/types/common.type';
import { RESPONSE_LIST_KEY } from '@/shared/constants';
import get from 'lodash/get';

type ProductPriceFilterProps = {
  onFilters: (data: ProductPriceFilterParams) => void;
  initialFilters?: ProductPriceFilterParams;
  pagination: PaginationState;
};

export default function ProductPriceFilters({
  onFilters,
  initialFilters,
  pagination,
}: Readonly<ProductPriceFilterProps>) {
  const t = useTranslations('ProductMessages');
  const tCommon = useTranslations('CommonMessages');
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>(
    initialFilters?.productCode ?? ''
  );

  const { data: productsData, status } = useGetProducts(pagination, {
    content: '',
    productType: '',
  });

  const onSubmitFilters = (productCode: string = '') => {
    onFilters({ productCode: productCode });
  };

  useEffect(() => {
    if (status === 'success') {
      const data = get(productsData?.result, RESPONSE_LIST_KEY, []);
      setProducts(data);
    }
  }, [status, productsData]);

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        <Label>{t('productCode')}</Label>
        <Select
          onValueChange={(value) => setSelectedProduct(value)}
          defaultValue={selectedProduct}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('selectedProductPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            {products?.map((product) => (
              <SelectItem key={product.productCode} value={product.productCode}>
                {product.productName} ({product.productCode})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row gap-2 w-full">
        <Button
          size="sm"
          variant="ringHover"
          className="w-full"
          onClick={() => {
            setSelectedProduct('');
            onSubmitFilters();
          }}
        >
          <IconRefresh size={16} className="mr-2" />
          {tCommon('btnReset')}
        </Button>
        <Button
          size="sm"
          variant="ringHover"
          className="w-full"
          form="product-filters"
          type="button"
          onClick={() => onSubmitFilters(selectedProduct)}
        >
          <FilterIcon size={16} className="mr-2" />
          {tCommon('btnApply')}
        </Button>
      </div>
    </div>
  );
}
