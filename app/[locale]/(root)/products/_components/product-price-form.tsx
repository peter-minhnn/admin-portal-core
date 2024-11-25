import { useEffect } from 'react';
import get from 'lodash/get';
import { ProductFormData, ProductPriceFormData } from '@/types/product.type';
import {
  useGetProductPriceDetail,
  useUpdateProductPrice,
} from '../_hooks/use-queries';
import { useTranslations } from 'next-intl';
import { useModal } from '@/hooks/use-modal';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductPriceFormSchema } from '../schema';
import NumberInput from '@/components/number-input';
import { Button } from '@/components/ui/button';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';

type ProductPriceProps = {
  rowData: ProductFormData;
};

export default function ProductPriceForm({
  rowData,
}: Readonly<ProductPriceProps>) {
  const t = useTranslations('ProductMessages');
  const tCommon = useTranslations('CommonMessages');
  const { closeModal } = useModal();

  const { data, status: priceStatus } = useGetProductPriceDetail(
    rowData.productCode
  );
  const { mutateAsync, status } = useUpdateProductPrice(t, closeModal);

  const form = useForm<ProductPriceFormData>({
    resolver: zodResolver(ProductPriceFormSchema),
    defaultValues: {
      price: 0,
      originalPrice: 0,
    },
  });

  const onSubmit = async (data: ProductPriceFormData) => {
    await mutateAsync({
      productCode: rowData.productCode,
      unitCode: rowData.unitCode,
      price: data.price,
      originalPrice: data.originalPrice,
    });
  };

  useEffect(() => {
    if (priceStatus === 'pending') return;
    const productPriceData = get(data?.result, 'data', {
      price: 0,
      originalPrice: 0,
    });
    form.reset(productPriceData);
  }, [data, priceStatus, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <NumberInput
          form={form}
          name="price"
          label={t('priceSell')}
          namespace="ProductMessages"
          placeholder={t('priceSell')}
        />
        <NumberInput
          form={form}
          name="originalPrice"
          label={t('originalPrice')}
          namespace="ProductMessages"
          placeholder={t('originalPrice')}
        />
        <div className="flex flex-row justify-end gap-2">
          <Button
            type="button"
            title={t('modalCancelBtn')}
            variant="outline"
            onClick={closeModal}
            disabled={status === 'pending'}
          >
            <IconX size={16} />
            {tCommon('btnCancel')}
          </Button>
          <Button
            type="submit"
            title={t('modalSaveBtn')}
            variant="secondary"
            disabled={status === 'pending'}
            loading={status === 'pending'}
          >
            <IconDeviceFloppy size={16} />
            {tCommon('btnSave')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
