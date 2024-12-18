import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AutosizeTextarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { CustomerFormData } from '@/types/customer.type';
import { CustomerFormSchema } from '@/app/[locale]/(root)/customers/shema';
import { useUpdateCustomer } from '@/app/[locale]/(root)/customers/_hooks/use-queries';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type CustomerFormProps = {
  rowData?: CustomerFormData;
};

const defaultProductData = {
  phoneNumber: '',
  customerName: '',
  address: '',
  email: '',
  companyId: 0,
  avatar: '',
  firstName: '',
  lastName: '',
  birthDate: '',
  gender: 0,
  isActive: true,
} as CustomerFormData;

export default function CustomerForm({ rowData }: Readonly<CustomerFormProps>) {
  const t = useTranslations('CustomerMessages');
  const tCommon = useTranslations('CommonMessages');
  const { closeModal } = useModal();
  const form = useForm<CustomerFormData>({
    resolver: zodResolver(CustomerFormSchema),
    defaultValues: rowData?.id
      ? { ...rowData, birthDate: '', avatar: rowData.avatar ?? '' }
      : { ...defaultProductData },
  });

  const { mutateAsync: updateCustomer, status: updateMutateStatus } =
    useUpdateCustomer(t, closeModal);

  const onSubmit = async (data: CustomerFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = data;
    await updateCustomer(rest);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col my-4 w-full items-center justify-center">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src={form.watch('avatar') || '/images/placeholder.png'}
                srcSet={form.watch('avatar') || '/images/placeholder.png'}
                alt={form.watch('avatar') || 'Product Image'}
                className="size-full rounded-[inherit] object-cover"
              />
              <AvatarFallback>
                <AvatarImage
                  src={'/images/placeholder.png'}
                  alt={form.watch('avatar') || 'Customer Image'}
                  className="size-full rounded-[inherit] object-cover"
                />
              </AvatarFallback>
            </Avatar>
            <p>
              <strong>
                {form.watch('firstName') ?? ''} {form.watch('lastName') ?? ''}
              </strong>
            </p>
          </div>
          <div className="flex flex-row justify-between w-full gap-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel required>{t('firstName')}</FormLabel>
                  <Input
                    {...field}
                    type="text"
                    placeholder={t('firstName')}
                    hasError={!!form.formState.errors.firstName}
                  />
                  <FormMessage namespace="CustomerMessages" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel required>{t('lastName')}</FormLabel>
                  <Input
                    type="text"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    placeholder={t('lastName')}
                    hasError={!!form.formState.errors.lastName}
                  />
                  <FormMessage namespace="CustomerMessages" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-2 w-full">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel required>{t('phoneNumber')}</FormLabel>
                  <Input
                    {...field}
                    type="text"
                    placeholder={t('phoneNumber')}
                    hasError={!!form.formState.errors.phoneNumber}
                  />
                  <FormMessage namespace="CustomerMessages" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t('email')}</FormLabel>
                  <Input
                    type="text"
                    value={field.value ?? ''}
                    placeholder={t('email')}
                    disabled
                  />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('address')}</FormLabel>
              <AutosizeTextarea
                value={field.value ?? ''}
                onChange={field.onChange}
                placeholder={t('address')}
                autoSize
              />
              <FormMessage namespace="CustomerMessages" />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-end gap-2">
          <Button
            type="button"
            title={tCommon('btnCancel')}
            variant="outline"
            onClick={closeModal}
            disabled={updateMutateStatus === 'pending'}
          >
            <IconX size={16} />
            {tCommon('btnCancel')}
          </Button>
          <Button
            type="submit"
            title={tCommon('btnSave')}
            variant="save"
            disabled={updateMutateStatus === 'pending'}
            loading={updateMutateStatus === 'pending'}
          >
            <IconDeviceFloppy size={16} />
            {tCommon('btnSave')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
