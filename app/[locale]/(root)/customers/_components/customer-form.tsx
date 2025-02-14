import React, { Dispatch, SetStateAction } from 'react';
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
import { useModal } from '@/hooks/use-modal';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { CustomerFormData, CustomerType } from '@/types/customer.type';
import { CustomerFormSchema } from '@/app/[locale]/(root)/customers/shema';
import {
  useCreateCustomer,
  useUpdateCustomer,
} from '@/app/[locale]/(root)/customers/_hooks/use-queries';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type CustomerFormProps = {
  rowData?: CustomerFormData;
  setIsSaved?: Dispatch<
    SetStateAction<{
      success: boolean;
      data: CustomerType | null;
    }>
  >;
};

const defaultProductData = {
  phoneNumber: '',
  customerName: '',
  address: '',
  email: '',
  companyId: 1,
  avatar: '',
  firstName: '',
  lastName: '',
  birthDate: '',
  gender: '1',
  isActive: true,
} as CustomerFormData;

export default function CustomerForm({
  rowData,
  setIsSaved,
}: Readonly<CustomerFormProps>) {
  const t = useTranslations('CustomerMessages');
  const tCommon = useTranslations('CommonMessages');
  const { closeModal } = useModal();
  const form = useForm<CustomerFormData>({
    resolver: zodResolver(CustomerFormSchema),
    defaultValues: rowData?.id
      ? {
          ...rowData,
          birthDate: '',
          avatar: rowData.avatar ?? '',
          gender: String(rowData.gender ?? '1'),
        }
      : { ...defaultProductData },
  });

  const { mutateAsync: updateCustomer, status: updateMutateStatus } =
    useUpdateCustomer(t, closeModal);

  const { mutateAsync: createCustomer, status: createMutateStatus } =
    useCreateCustomer(t, (data: CustomerType) =>
      setIsSaved?.({ success: true, data: data })
    );

  const onSubmit = async (data: CustomerFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = data;
    const obj = {
      email: rest.email,
      phoneNumber: rest.phoneNumber,
      firstName: rest.firstName,
      lastName: rest.lastName,
      address: rest.address,
      gender: Number(rest.gender),
      companyId: rest.companyId,
      avatar: rest.avatar,
      birthDate: rest.birthDate,
    };

    if (id) {
      await updateCustomer({ ...obj, id, isActive: rest.isActive });
      return;
    }
    await createCustomer(obj);
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
                  <FormLabel required>{t('email')}</FormLabel>
                  <Input
                    {...field}
                    type="text"
                    placeholder={t('email')}
                    hasError={!!form.formState.errors.email}
                  />
                  <FormMessage namespace="CustomerMessages" />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel required>{t('gender')}</FormLabel>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
                className="flex flex-row items-center"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="1" />
                  </FormControl>
                  <FormLabel className="font-normal">{t('male')}</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="2" />
                  </FormControl>
                  <FormLabel className="font-normal">{t('female')}</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="0" />
                  </FormControl>
                  <FormLabel className="font-normal">{t('other')}</FormLabel>
                </FormItem>
              </RadioGroup>
              <FormMessage namespace="CustomerMessages" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>{t('address')}</FormLabel>
              <AutosizeTextarea
                value={field.value ?? ''}
                onChange={field.onChange}
                placeholder={t('address')}
                autoSize
                hasError={!!form.formState.errors.address}
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
            onClick={() => closeModal(false)}
            disabled={
              updateMutateStatus === 'pending' ||
              createMutateStatus === 'pending'
            }
          >
            <IconX size={16} />
            {tCommon('btnCancel')}
          </Button>
          <Button
            type="submit"
            title={tCommon('btnSave')}
            variant="save"
            disabled={
              updateMutateStatus === 'pending' ||
              createMutateStatus === 'pending'
            }
            loading={
              updateMutateStatus === 'pending' ||
              createMutateStatus === 'pending'
            }
          >
            <IconDeviceFloppy size={16} />
            {tCommon('btnSave')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
