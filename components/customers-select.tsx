import { FormControl } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import InfiniteScroll from '@/components/ui/infinite-scroll';
import { IconLoader2 } from '@tabler/icons-react';
import React, { useCallback, useEffect, useState } from 'react';
import get from 'lodash/get';
import { RESPONSE_LIST_KEY } from '@/shared/constants';
import { CustomerType } from '@/types/order.type';
import { useGetCustomers } from '@/app/[locale]/(root)/products/_hooks/use-queries';
import { PAGE_SIZE } from '@/shared/enums';
import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';

type CustomersSelectProps = {
  translateKey: any;
  value: string;
  onValueChange: (value: CustomerType) => void;
  hasError?: boolean;
  disabled?: boolean;
};

export default function CustomersSelect({
  value,
  onValueChange,
  translateKey,
  hasError,
  disabled,
}: Readonly<CustomersSelectProps>) {
  const t = useTranslations(translateKey) as any;
  const [customerPage, setCustomerPage] = useState<number>(0);
  const [hasMoreCustomers, setHasMoreCustomers] = useState<boolean>(true);
  const [customers, setCustomers] = useState<CustomerType[]>([]);

  const { data: customersData, status: customerStatus } = useGetCustomers({
    pageIndex: customerPage + 1,
    pageSize: PAGE_SIZE,
  });

  const nextCustomers = useCallback(() => {
    setCustomerPage(customerPage + 1);
  }, [customerPage]);

  useEffect(() => {
    if (customerStatus === 'pending' || customersData?.type === 'error') {
      setCustomers([]);
      return;
    }

    const list = get(customersData?.result, RESPONSE_LIST_KEY, []);
    setCustomers((prev) => [...prev, ...list]);

    const totalPage = get(customersData?.result, 'meta.pageCount', 0);
    if (customerPage >= totalPage) {
      setHasMoreCustomers(false);
    }
  }, [customersData, customerStatus, customerPage]);

  if (customerStatus === 'pending' && customerPage === 0) {
    return <Skeleton className="w-full h-10" />;
  }

  return (
    <Select
      onValueChange={(value) => {
        const customer = customers.find((item) => item.id === Number(value));
        onValueChange(customer! ?? {});
      }}
      defaultValue={value}
      value={value}
      disabled={disabled}
    >
      <FormControl>
        <SelectTrigger className="w-full" hasError={hasError}>
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
          hasMore={hasMoreCustomers}
          isLoading={customerStatus === 'pending'}
          next={nextCustomers}
          threshold={1}
        >
          {hasMoreCustomers && (
            <IconLoader2 className="my-4 h-8 w-8 animate-spin" />
          )}
        </InfiniteScroll>
      </SelectContent>
    </Select>
  );
}
