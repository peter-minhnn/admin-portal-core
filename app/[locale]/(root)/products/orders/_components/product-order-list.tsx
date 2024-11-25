'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { FilterIcon, PlusIcon } from 'lucide-react';
import { useMaterialReactTable } from 'material-react-table';
import { useModal } from '@/hooks/use-modal';
import { useIsMobile } from '@/hooks/use-mobile';
import { useWindowSize } from '@/hooks/use-window-size';
// import {useAlertModal} from "@/hooks/use-alert-modal";
// import {useQueryClient} from "@tanstack/react-query";
// import {useActionsButtonStore} from "@/states/common.state";
import { ListResponseType, PaginationState } from '@/types/common.type';
import { PAGE_SIZE } from '@/shared/enums';
import { ProductOrderFilterParams, ProductOrderType } from '@/types/order.type';
import { Button } from '@/components/ui/button';
import { useGetOrders } from '@/app/[locale]/(root)/products/_hooks/use-queries';
import DrawerLayout from '@/components/drawer-layout';
import { DataTableProps } from '@/shared/data-table-props';
import useProductOrderColumns from '@/app/[locale]/(root)/products/_hooks/use-product-order-columns';
import DataTable from '@/components/data-table';
import { formatDate } from 'date-fns';

export default function ProductOrderList() {
  const t = useTranslations('ProductMessages');
  const tCommon = useTranslations('CommonMessages');
  const { isClosed } = useModal();
  // const { openAlertModal, closeAlertModal } = useAlertModal();
  const isMobile = useIsMobile();
  const { width } = useWindowSize();
  // const queryClient = useQueryClient();
  // const { actionType, actionData, setActionType } = useActionsButtonStore();

  const [orders, setOrders] = useState<ListResponseType<ProductOrderType>>({
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
  const [filterParams] = useState<ProductOrderFilterParams>({
    fromDate: formatDate(new Date(2024, 1, 1), 'yyyy-MM-dd'),
    toDate: formatDate(new Date(), 'yyyy-MM-dd'),
  });
  const [isFilterOpened, setIsFilterOpened] = useState(false);

  const {
    isFetching: isFetchingOrders,
    data: ordersData,
    refetch: refetchOrders,
    isRefetching: isRefetchingGetOrders,
  } = useGetOrders(pagination, filterParams);

  const productOrderColumns = useProductOrderColumns({ t });

  const table = useMaterialReactTable({
    ...DataTableProps(tCommon),
    columns: productOrderColumns,
    data: orders?.data ?? [],
    rowCount: orders?.meta?.itemCount ?? 0,
    pageCount: orders?.meta?.pageCount ?? 0,
    getRowId: (row) => String(row.id),
    enableColumnPinning: true,
    enableRowPinning: true,
    onPaginationChange: setPagination, //hoist pagination state to your state when it changes internally
    state: {
      pagination,
      isLoading: isFetchingOrders,
      showProgressBars: isRefetchingGetOrders,
    }, //pass the pagination state to the table
    initialState: {
      columnSizing: {
        'mrt-row-actions': 120,
        orderCode: 190,
        totalAmount: 150,
      },
    },
    renderTopToolbarCustomActions: () => (
      <div className="flex justify-between gap-1 w-full">
        <Button
          type="button"
          size="sm"
          title={t('addProductModalTitle')}
          // onClick={handleAddProduct}
        >
          <PlusIcon size={18} />
          {!isMobile ? t('addProductModalTitle') : ''}
        </Button>
        <DrawerLayout
          headerTitle={tCommon('btnAdvancedFilters')}
          openButtonLabel={!isMobile ? tCommon('btnAdvancedFilters') : ''}
          openButtonIcon={<FilterIcon size={18} />}
          openButtonClassName="flex flex-row gap-1"
          open={isFilterOpened}
          setOpen={setIsFilterOpened}
        >
          {/*<ProductFilters*/}
          {/*    productTypes={(productTypesData as CommonCodeType[]) ?? []}*/}
          {/*    onFilters={onFilters}*/}
          {/*    initialFilters={filterParams}*/}
          {/*/>*/}
          <></>
        </DrawerLayout>
      </div>
    ),
  });

  useEffect(() => {
    console.log('ordersData', ordersData);
    if (isFetchingOrders || ordersData?.type === 'error') return;
    setOrders(ordersData?.result.data);
  }, [ordersData, isFetchingOrders]);

  useEffect(() => {
    // if (deleteMutateStatus === 'pending') return;
    refetchOrders().finally();
  }, [pagination, isClosed, refetchOrders]);

  useEffect(() => {
    if (width > 1280) {
      table.initialState.columnPinning = {
        left: ['mrt-row-pin', 'orderStatus'],
        right: ['actions'],
      };
    } else {
      table.initialState.columnPinning = {};
    }
  }, [width, table]);

  return <DataTable table={table} />;
}
