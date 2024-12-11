'use client';

import React, { useEffect, useRef } from 'react';
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
import { AutosizeTextarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProductOrderFormSchema } from '../../../products/schema';
import { useModal } from '@/hooks/use-modal';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import {
  useAddOrder,
  useGetOrderDetail,
  useUpdateOrder,
} from '../../_hooks/use-queries';
import { generateCode } from '@/shared/lib';
import { OrderRequestType, ProductOrderFormData } from '@/types/order.type';
import CustomersSelect from '@/components/customers-select';
import NumberInput from '@/components/number-input';
import {
  DeliveryOrderData,
  OrderStatusData,
  PaymentStatusData,
} from '@/app/[locale]/(root)/products/orders/product-order.data';
import OrderDetailForm from '../_components/product-order-detail-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import get from 'lodash/get';
import { toast } from 'sonner';
import { useUserStore } from '@/states/common.state';

type ProductOrderFormProps = {
  rowData?: ProductOrderFormData;
};

const defaultProductOrderData: ProductOrderFormData = {
  orderCode: '',
  customerId: '',
  deliveryType: '',
  orderStatus: '',
  paymentStatus: '',
  deliveryAddress: '',
  totalAmount: 0,
  totalPrice: 0,
  discountAmount: 0,
  discountPercent: 0,
  orderDetails: [],
  orderDate: '',
  phoneNumber: '',
};

export default function ProductOrderForm({
  rowData,
}: Readonly<ProductOrderFormProps>) {
  const t = useTranslations('ProductMessages');
  const { closeModal } = useModal();
  const { userInfo } = useUserStore();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const modalType = rowData?.orderCode ? 'edit' : 'add';
  const orderStatusOptions = OrderStatusData(modalType).filter(
    (v) => v.isActive
  );
  const paymentStatusOptions = PaymentStatusData(modalType).filter(
    (v) => v.isActive
  );

  const form = useForm<ProductOrderFormData>({
    resolver: zodResolver(ProductOrderFormSchema),
    defaultValues: rowData?.orderCode
      ? { ...rowData }
      : {
          ...defaultProductOrderData,
          orderStatus: orderStatusOptions[0].code,
          paymentStatus: paymentStatusOptions[0].code,
        },
  });

  const { mutateAsync: addOrderAsync, status: addMutateStatus } = useAddOrder(
    t,
    closeModal
  );
  const { mutateAsync: updateOrderAsync, status: updateMutateStatus } =
    useUpdateOrder(t, closeModal);
  const { data: orderDetailData, status } = useGetOrderDetail(
    String(rowData?.orderCode ?? '')
  );

  const onSubmit = async (data: ProductOrderFormData) => {
    const obj: OrderRequestType = {
      ...data,
      customerId: Number(data.customerId),
      orderCode:
        modalType === 'edit' ? String(data.orderCode ?? '') : generateCode(),
      orderDetails: data.orderDetails.map((item) => ({
        productCode: item.productCode,
        unitCode: item.unitCode,
        quantity: item.quantity,
        remainQty: item.remainQty,
        price: item.price,
      })),
      companyId: userInfo?.companyId ?? 0,
    };
    if (modalType === 'edit') {
      await updateOrderAsync(obj);
      return;
    }
    await addOrderAsync(obj);
  };

  useEffect(() => {
    if (status === 'pending' || orderDetailData?.type === 'error') return;

    if (orderDetailData?.type === 'success') {
      const item = get(
        orderDetailData,
        'result.data',
        {}
      ) as ProductOrderFormData;
      if (!item) {
        toast.error(t('notifications.getOrderDetailError'));
        form.reset({ ...defaultProductOrderData });
        return;
      }

      form.reset({
        ...item,
        customerId: String(item.customerId),
        orderDetails: item.orderDetails,
      });
    }
  }, [orderDetailData, status, form, t]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <ScrollArea className="w-full lg:h-[500px] px-2" ref={scrollAreaRef}>
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={['order-info', 'product-order-detail']}
          >
            <AccordionItem value="order-info">
              <AccordionTrigger className="hover:no-underline">
                <Badge variant="primary">
                  <h4 className="text-lg font-semibold leading-none">
                    {t('orders.orderDetailForm')}
                  </h4>
                </Badge>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 px-2">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between w-full gap-2">
                    <FormField
                      control={form.control}
                      name="customerId"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel htmlFor="customerId">
                            {t('orders.customerId')}
                          </FormLabel>
                          <CustomersSelect
                            value={field.value}
                            onValueChange={(value) => {
                              field.onChange(String(value.id));
                              form.setValue(
                                'phoneNumber',
                                get(value, 'phoneNumber', '')
                              );
                            }}
                            translateKey="ProductMessages"
                            hasError={!!form.formState.errors.customerId}
                            disabled={form.watch('orderStatus') === 'APPROVED'}
                          />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deliveryType"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel htmlFor="deliveryType">
                            {t('orders.deliveryType')}
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                            disabled={form.watch('orderStatus') === 'APPROVED'}
                          >
                            <FormControl>
                              <SelectTrigger
                                className="w-full"
                                hasError={!!form.formState.errors.deliveryType}
                              >
                                <SelectValue
                                  placeholder={t('orders.selectDeliveryType')}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {DeliveryOrderData.map((item) => (
                                <SelectItem key={item.code} value={item.code}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-row justify-between gap-2 w-full">
                    <NumberInput
                      form={form}
                      namespace="ProductMessages"
                      name="totalPrice"
                      label={t('orders.totalPrice')}
                      placeholder={t('orders.totalPrice')}
                      disabled={form.watch('orderStatus') === 'APPROVED'}
                    />
                    <NumberInput
                      form={form}
                      namespace="ProductMessages"
                      name="totalAmount"
                      label={t('orders.totalAmount')}
                      placeholder={t('orders.totalAmount')}
                      disabled={form.watch('orderStatus') === 'APPROVED'}
                    />
                  </div>
                  <div className="hidden">
                    <NumberInput
                      form={form}
                      namespace="ProductMessages"
                      name="discountAmount"
                      label={t('orders.discountAmount')}
                      placeholder={t('orders.discountAmount')}
                      disabled={form.watch('orderStatus') === 'APPROVED'}
                    />
                    <NumberInput
                      form={form}
                      namespace="ProductMessages"
                      name="discountPercent"
                      label={t('orders.discountPercent')}
                      placeholder={t('orders.discountPercent')}
                      disabled={form.watch('orderStatus') === 'APPROVED'}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-2 w-full">
                  <FormField
                    control={form.control}
                    name="orderStatus"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor="orderStatus">
                          {t('orders.orderStatus')}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                          disabled={
                            field.value === 'APPROVED' ||
                            ['edit', 'add'].includes(modalType)
                          }
                        >
                          <FormControl>
                            <SelectTrigger
                              className="w-full"
                              hasError={!!form.formState.errors.orderStatus}
                            >
                              <SelectValue
                                placeholder={t('orders.selectOrderStatus')}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {orderStatusOptions.map((item) => (
                              <SelectItem key={item.code} value={item.code}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="paymentStatus"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor="paymentStatus">
                          {t('orders.paymentStatus')}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                          disabled={form.watch('orderStatus') === 'NEW'}
                        >
                          <FormControl>
                            <SelectTrigger
                              className="w-full"
                              hasError={!!form.formState.errors.paymentStatus}
                            >
                              <SelectValue
                                placeholder={t('orders.selectPaymentStatus')}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {paymentStatusOptions.map((item) => (
                              <SelectItem key={item.code} value={item.code}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="deliveryAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('orders.deliveryAddress')}</FormLabel>
                      <AutosizeTextarea
                        value={field.value ?? ''}
                        onChange={field.onChange}
                        placeholder={t('orders.deliveryAddress')}
                        autoSize
                        hasError={!!form.formState.errors.deliveryAddress}
                        disabled={form.watch('orderStatus') === 'APPROVED'}
                      />
                      <FormMessage namespace="ProductMessages" />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
            <div className="flex flex-col gap-2 w-full mt-4">
              <OrderDetailForm form={form} modalType={modalType} />
            </div>
          </Accordion>
          <div id="scroll-area-bottom"></div>
        </ScrollArea>
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
            variant="secondary"
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
