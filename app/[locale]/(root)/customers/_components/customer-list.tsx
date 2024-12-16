'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import get from 'lodash/get';
// import {useQueryClient} from "@tanstack/react-query";
// import {useModal} from "@/hooks/use-modal";
// import {useAlertModal} from "@/hooks/use-alert-modal";
// import {useIsMobile} from "@/hooks/use-mobile";
// import {useWindowSize} from "@/hooks/use-window-size";
// import {useActionsButtonStore} from "@/states/common.state";
import { Locale } from '@/shared/configs/i18n/config';
import { PAGE_SIZE } from '@/shared/enums';
import { ListResponseType, PaginationState } from '@/types/common.type';
import { CustomerType } from '@/types/customer.type';
import { useGetCustomers } from '@/app/[locale]/(root)/products/_hooks/use-queries';
import { RESPONSE_OBJ_KEY } from '@/shared/constants';
import { useMaterialReactTable } from 'material-react-table';
import { DataTableProps } from '@/shared/data-table-props';
import useCustomerColumns from '@/app/[locale]/(root)/customers/_hooks/use-customer-columns';
import DataTable from '@/components/data-table';

export default function CustomerList() {
  const t = useTranslations('CustomerMessages');
  // const tCommon = useTranslations('CommonMessages');
  // const { openModal, closeModal, isClosed } = useModal();
  // const { openAlertModal, closeAlertModal } = useAlertModal();
  // const isMobile = useIsMobile();
  // const { width } = useWindowSize();
  // const queryClient = useQueryClient();
  // const { actionType, actionData, setActionType } = useActionsButtonStore();
  const locale = useLocale() as Locale;

  const [customers, setCustomers] = useState<ListResponseType<CustomerType>>({
    data: [],
    meta: {
      take: PAGE_SIZE,
      page: 0,
      pageCount: 0,
    },
  });
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  const {
    data: customerData,
    isFetching,
    isRefetching,
    status,
  } = useGetCustomers({
    pageIndex: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  });

  const customerColumns = useCustomerColumns({ t });

  const table = useMaterialReactTable({
    ...DataTableProps(locale),
    columns: customerColumns,
    data: customers?.data ?? [],
    rowCount: customers?.meta?.itemCount ?? 0,
    pageCount: customers?.meta?.pageCount ?? 0,
    getRowId: (row) => String(row.id),
    enableColumnPinning: true,
    enableRowPinning: true,
    onPaginationChange: setPagination, //hoist pagination state to your state when it changes internally
    state: {
      pagination,
      isLoading: isFetching,
      showProgressBars: isRefetching,
    }, //pass the pagination state to the table
    initialState: {
      columnSizing: { 'mrt-row-actions': 120 },
    },
  });

  useEffect(() => {
    if (status === 'pending' || customerData?.type === 'error') {
      setCustomers({
        data: [],
        meta: {
          take: PAGE_SIZE,
          page: 0,
          pageCount: 0,
        },
      });
      return;
    }

    const customers = get(customerData?.result, RESPONSE_OBJ_KEY, null);
    setCustomers({
      data: get(customers, 'data', []),
      meta: get(customers, 'meta', {
        take: PAGE_SIZE,
        page: 0,
        pageCount: 0,
      }),
    });
  }, [customerData, status]);

  return <DataTable table={table} />;
}
