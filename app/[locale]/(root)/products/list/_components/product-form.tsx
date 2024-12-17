'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AutosizeTextarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProductFormSchema } from '@/app/[locale]/(root)/products/schema';
import { ProductFormData, UnitType } from '@/types/product.type';
import { useModal } from '@/hooks/use-modal';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import FileUpload from '@/components/upload';
import { CommonCodeType } from '@/types/common.type';
import {
  useAddProduct,
  useUpdateProduct,
} from '@/app/[locale]/(root)/products/_hooks/use-queries';
import { generateUniqueId } from '@/shared/lib';
import { useUserStore } from '@/states/common.state';
import { useUploadFile } from '@/hooks/use-upload-file';
import { FileType } from '@/types/file.type';
import get from 'lodash/get';
import NumberInput from '@/components/number-input';

type ProductFormProps = {
  units: UnitType[];
  productTypes: CommonCodeType[];
  rowData?: ProductFormData;
};

const defaultProductData = {
  productCode: '',
  productName: '',
  productPrice: 0,
  productType: '',
  unitCode: '',
  productMinQty: 0,
  productMaxQty: 0,
  productDesc: '',
  productImage: '',
  companyId: 1,
} as ProductFormData;

export default function ProductForm({
  units = [],
  productTypes = [],
  rowData,
}: Readonly<ProductFormProps>) {
  const t = useTranslations('ProductMessages');
  const { closeModal } = useModal();
  const { userInfo } = useUserStore();
  const modalType = rowData?.productCode ? 'edit' : 'add';
  const form = useForm<ProductFormData>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: rowData?.productCode
      ? { ...rowData }
      : {
          ...defaultProductData,
          productType: productTypes[0]?.code,
          unitCode: units[0]?.unitCode,
        },
  });
  const [files, setFiles] = useState<File[] | null>(null);

  const { mutateAsync: addProduct, status: addMutateStatus } = useAddProduct(
    t,
    closeModal
  );
  const { mutateAsync: updateProduct, status: updateMutateStatus } =
    useUpdateProduct(t, closeModal);

  const { mutateAsync } = useUploadFile();

  const onSubmit = async (data: ProductFormData) => {
    let path: string = '';

    if (files?.length) {
      const uploadResponse = await mutateAsync(files[0]);

      if (uploadResponse.type === 'success') {
        const fileData = get(uploadResponse, 'result.data', {}) as FileType;
        path = fileData?.file?.path ?? '';
      }
    }

    const obj = {
      unitCode: data.unitCode,
      productDesc: data.productDesc ?? '',
      productName: data.productName,
      productType: data.productType,
      productPrice: Number(data.productPrice),
      productMinQty: Number(data.productMinQty),
      productMaxQty: Number(data.productMaxQty),
      productCode:
        modalType === 'edit'
          ? data.productCode
          : generateUniqueId(data.productType),
      productImage: path,
      companyId: userInfo?.companyId ?? 1,
    };
    if (modalType === 'edit') {
      await updateProduct(obj);
      return;
    }
    await addProduct(obj);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 mt-4"
      >
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="productCode"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormLabel>Product Code</FormLabel>
                <Input
                  type="text"
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  disabled
                />
              </FormItem>
            )}
          />
          <div className="flex flex-row justify-between w-full gap-2">
            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel required>{t('productType')}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={modalType === 'edit'}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectProductTypeCode')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {productTypes.map((product) => (
                        <SelectItem key={product.code} value={product.code}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage namespace="ProductMessages" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel required>{t('productName')}</FormLabel>
                  <Input
                    type="text"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    placeholder={t('productName')}
                    hasError={!!form.formState.errors.productName}
                  />
                  <FormMessage namespace="ProductMessages" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-2 w-full">
            <NumberInput
              form={form}
              name="productPrice"
              label={t('productPrice')}
              placeholder={t('productPrice')}
              namespace="ProductMessages"
            />
            <FormField
              control={form.control}
              name="unitCode"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel required>{t('unitCode')}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectUnitCode')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit.unitCode} value={unit.unitCode}>
                          {unit.unitName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage namespace="ProductMessages" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-2 w-full">
            <NumberInput
              form={form}
              name="productMinQty"
              label={t('productMinQty')}
              placeholder={t('productMinQty')}
              namespace="ProductMessages"
            />
            <NumberInput
              form={form}
              name="productMaxQty"
              label={t('productMaxQty')}
              placeholder={t('productMaxQty')}
              namespace="ProductMessages"
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="productDesc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('productDesc')}</FormLabel>
              <AutosizeTextarea
                value={field.value ?? ''}
                onChange={field.onChange}
                placeholder={t('productDesc')}
                autoSize
              />
              <FormMessage namespace="ProductMessages" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productImage"
          render={() => (
            <FormItem>
              <FormLabel>{t('productDesc')}</FormLabel>
              <FileUpload
                files={files}
                onValueChange={(value) => {
                  setFiles(value);
                }}
              />
              <FormMessage namespace="ProductMessages" />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-end gap-2">
          <Button
            type="button"
            title={t('modalCancelBtn')}
            variant="outline"
            onClick={closeModal}
            disabled={
              addMutateStatus === 'pending' || updateMutateStatus === 'pending'
            }
          >
            <IconX size={16} />
            {t('modalCancelBtn')}
          </Button>
          <Button
            type="submit"
            title={t('modalSaveBtn')}
            variant="save"
            disabled={
              addMutateStatus === 'pending' || updateMutateStatus === 'pending'
            }
            loading={
              addMutateStatus === 'pending' || updateMutateStatus === 'pending'
            }
          >
            <IconDeviceFloppy size={16} />
            {t('modalSaveBtn')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
