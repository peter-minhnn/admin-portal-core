import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocale, useTranslations } from 'next-intl';
import { FilterIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomerType, ProductOrderFilterFormData } from '@/types/order.type';
import { ProductOrderFilterFormSchema } from '../../schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { IconLoader2, IconRefresh } from '@tabler/icons-react';
import { DateTimePicker } from '@/components/ui/datepicker';
import { isDate } from 'date-fns';
import { useGetCustomers } from '../../_hooks/use-queries';
import { PAGE_SIZE } from '@/shared/enums';
import { get } from 'lodash';
import { RESPONSE_LIST_KEY } from '@/shared/constants';
import InfiniteScroll from '@/components/ui/infinite-scroll';
import {
  DeliveryOrderData,
  PaymentStatusData,
  OrderStatusData,
} from '../product-order.data';

type ProductOrderFilterProps = {
  onFilters: (data: ProductOrderFilterFormData) => void;
  initialFilters?: ProductOrderFilterFormData;
};

const defaultFormValues: ProductOrderFilterFormData = {
  fromDate: new Date(new Date().getFullYear() - 1, 0, 1),
  toDate: new Date(),
  customerId: 'all',
  orderCode: '',
  deliveryType: 'all',
  orderStatus: 'all',
  paymentStatus: 'all',
  isExport: false,
};

export default function ProductOrderFilters({
  onFilters,
  initialFilters,
}: Readonly<ProductOrderFilterProps>) {
  const t = useTranslations('ProductMessages');
  const tCommon = useTranslations('CommonMessages');
  const locale = useLocale();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [customers, setCustomers] = useState<CustomerType[]>([]);

  const form = useForm<ProductOrderFilterFormData>({
    resolver: zodResolver(ProductOrderFilterFormSchema),
    defaultValues: initialFilters ?? defaultFormValues,
  });

  const { data: customersData, status: customerStatus } = useGetCustomers({
    pageIndex: page + 1,
    pageSize: PAGE_SIZE,
  });

  const deliveryOrderOptions = DeliveryOrderData('search').filter(
    (v) => v.isActive
  );
  const orderStatusOptions = OrderStatusData('search').filter(
    (v) => v.isActive
  );
  const paymentStatusOptions = PaymentStatusData('search').filter(
    (v) => v.isActive
  );

  const onSubmitFilters = (data: ProductOrderFilterFormData) => {
    onFilters({ ...data });
  };

  const next = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  useEffect(() => {
    if (customerStatus === 'pending' || customersData?.type === 'error') {
      setCustomers([]);
      return;
    }

    const list = get(customersData?.result, RESPONSE_LIST_KEY, []);
    setCustomers((prev) => [...prev, ...list]);

    const totalPage = get(customersData?.result, 'meta.pageCount', 0);
    if (page >= totalPage) {
      setHasMore(false);
    }
  }, [customersData, customerStatus, page]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitFilters)}
        className="h-full flex flex-col justify-between gap-2"
      >
        <div className="flex flex-col gap-2">
          <div className="mb-4 flex flex-row justify-between gap-2">
            <FormField
              control={form.control}
              name="fromDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="fromDate">
                    {t('orders.fromDate')}
                  </FormLabel>
                  <DateTimePicker
                    value={
                      field.value && isDate(new Date(field.value))
                        ? new Date(field.value)
                        : undefined
                    }
                    onChange={field.onChange}
                    placeholder={t('orders.selectFromDate')}
                    className="w-full"
                    displayFormat={{
                      hour24: 'yyyy-MM-dd',
                    }}
                    locale={locale as any}
                    granularity="day"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="toDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="toDate">{t('orders.toDate')}</FormLabel>
                  <DateTimePicker
                    value={
                      field.value && isDate(new Date(field.value))
                        ? new Date(field.value)
                        : undefined
                    }
                    onChange={field.onChange}
                    placeholder={t('orders.selectToDate')}
                    className="w-full"
                    displayFormat={{
                      hour24: 'yyyy-MM-dd',
                    }}
                    locale={locale as any}
                    granularity="day"
                  />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row justify-between gap-2">
            <FormField
              control={form.control}
              name="orderCode"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="orderCode">
                    {t('orders.orderCode')}
                  </FormLabel>
                  <Input
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    type="text"
                    className="w-full"
                    placeholder={t('orders.orderCodePlaceholder')}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="customerId">
                    {t('orders.customerId')}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t('orders.selectCustomer')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customers.map((item) => (
                        <SelectItem key={item.id} value={String(item.id)}>
                          {item.firstName} {item.lastName}
                        </SelectItem>
                      ))}
                      <InfiniteScroll
                        hasMore={hasMore}
                        isLoading={customerStatus === 'pending'}
                        next={next}
                        threshold={1}
                      >
                        {hasMore && (
                          <IconLoader2 className="my-4 h-8 w-8 animate-spin" />
                        )}
                      </InfiniteScroll>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row justify-between gap-2">
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
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={t('orders.selectDeliveryType')}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {deliveryOrderOptions.map((item) => (
                        <SelectItem key={item.code} value={item.code}>
                          {item.code === 'all'
                            ? tCommon(item.name as any)
                            : item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
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
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={t('orders.selectOrderStatus')}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {orderStatusOptions.map((item) => (
                        <SelectItem key={item.code} value={item.code}>
                          {item.code === 'all'
                            ? tCommon(item.name as any)
                            : item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row justify-between gap-2">
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
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={t('orders.selectPaymentStatus')}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {paymentStatusOptions.map((item) => (
                        <SelectItem key={item.code} value={item.code}>
                          {item.code === 'all'
                            ? tCommon(item.name as any)
                            : item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2 w-full">
          <Button
            size="sm"
            variant="ringHover"
            className="w-full"
            onClick={() => form.reset(defaultFormValues)}
          >
            <IconRefresh size={16} className="mr-2" />
            {tCommon('btnReset')}
          </Button>
          <Button
            size="sm"
            variant="ringHover"
            className="w-full"
            type="submit"
          >
            <FilterIcon size={16} className="mr-2" />
            {tCommon('btnApply')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
