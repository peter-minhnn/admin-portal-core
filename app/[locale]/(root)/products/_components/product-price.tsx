import { PaginationState } from '@/types/common.type';
import {
  ProductFilterParams,
  ProductFormData,
  ProductPriceFormData,
  ProductPriceType,
} from '@/types/product.type';
import {
  useGetProductPrice,
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
  filterParams: ProductFilterParams;
  pagination: PaginationState;
};

export default function ProductPrice({
  rowData,
  filterParams,
  pagination,
}: Readonly<ProductPriceProps>) {
  const t = useTranslations('ProductMessages');
  const tCommon = useTranslations('CommonMessages');
  const { closeModal } = useModal();

  const { data } = useGetProductPrice(rowData?.productCode ?? '');
  const { mutateAsync, status } = useUpdateProductPrice(
    t,
    closeModal,
    filterParams,
    pagination
  );

  const form = useForm<ProductPriceFormData>({
    resolver: zodResolver(ProductPriceFormSchema),
    defaultValues: {
      price:
        data?.type === 'success' ? (data.result as ProductPriceType)?.price : 0,
    },
  });

  const onSubmit = async (data: ProductPriceFormData) => {
    await mutateAsync({
      productCode: rowData.productCode,
      unitCode: rowData.unitCode,
      price: data.price,
    });
  };

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
