'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { FilterIcon, PlusIcon, XIcon } from 'lucide-react';
import { MRT_Row, useMaterialReactTable } from 'material-react-table';
import { formatDate } from 'date-fns';
import { useModal } from '@/hooks/use-modal';
import { useIsMobile } from '@/hooks/use-mobile';
import { useWindowSize } from '@/hooks/use-window-size';
import { useAlertModal } from '@/hooks/use-alert-modal';
import {
  ExportExcelType,
  ListResponseType,
  PaginationState,
} from '@/types/common.type';
import { PAGE_SIZE } from '@/shared/enums';
import {
  OrderStatus,
  ProductOrderFilterFormData,
  ProductOrderFormData,
  ProductOrderType,
} from '@/types/order.type';
import { Button } from '@/components/ui/button';
import {
  useDeleteOrder,
  useGetOrders,
  useOrdersExport,
} from '../../_hooks/use-queries';
import DrawerLayout from '@/components/drawer-layout';
import { DataTableProps } from '@/shared/data-table-props';
import useProductOrderColumns from '../../_hooks/use-product-order-columns';
import DataTable from '@/components/data-table';
import ProductOrderFilters from './product-order-filters';
import ProductOrderForm from './product-order-form';
import { useActionsButtonStore } from '@/states/common.state';
import { ProductOrderApprove } from '@/app/[locale]/(root)/products/orders/_components/product-order-approve';
import { Locale } from '@/shared/configs/i18n/config';
import { IconCheck, IconFileExcel } from '@tabler/icons-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { download, generateCsv, mkConfig } from 'export-to-csv';
import { convertToOrderExcelData } from '@/app/[locale]/(root)/products/orders/product-order.data';
import get from 'lodash/get';
import { RESPONSE_OBJ_KEY } from '@/shared/constants';

const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
});

export default function ProductOrderList() {
  const t = useTranslations('ProductMessages');
  const tCommon = useTranslations('CommonMessages');
  const { isOpen, isRefresh, openModal, closeModal } = useModal();
  const { openAlertModal, closeAlertModal } = useAlertModal();
  const isMobile = useIsMobile();
  const { width } = useWindowSize();
  const { actionType, actionData, setActionType } = useActionsButtonStore();
  const locale = useLocale() as Locale;

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
  const [filterParams, setFilterParams] = useState<ProductOrderFilterFormData>({
    fromDate: formatDate(
      new Date(new Date().getFullYear(), 0, 1),
      'yyyy-MM-dd'
    ),
    toDate: formatDate(new Date(), 'yyyy-MM-dd'),
    isExport: false,
  });
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const [exportExcelType, setExportExcelType] =
    useState<ExportExcelType>('all');
  const [selectedRows, setSelectedRows] = useState<MRT_Row<ProductOrderType>[]>(
    []
  );

  const {
    isFetching: isFetchingOrders,
    data: ordersData,
    refetch: refetchOrders,
  } = useGetOrders(pagination, filterParams);

  const { mutateAsync: deleteOrder, status: deleteOrderStatus } =
    useDeleteOrder(t, closeAlertModal);

  const { mutateAsync: mutateExportData, status: exportStatus } =
    useOrdersExport(t, closeModal, locale);

  const productOrderColumns = useProductOrderColumns({ t });

  const table = useMaterialReactTable({
    ...DataTableProps(locale),
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
      isLoading: isFetchingOrders && !isOpen,
    }, //pass the pagination state to the table
    initialState: {
      columnSizing: {
        'mrt-row-actions': 120,
        orderCode: 190,
        totalAmount: 150,
      },
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <div className="flex justify-start gap-2 w-fit">
        <Button
          type="button"
          size="sm"
          title={t('orders.addOrderModalTitle')}
          onClick={handleAddOrder}
          variant="blueShine"
        >
          <PlusIcon size={18} />
          {!isMobile ? t('orders.addOrderModalTitle') : ''}
        </Button>
        <DrawerLayout
          headerTitle={tCommon('btnAdvancedFilters')}
          openButtonLabel={!isMobile ? tCommon('btnAdvancedFilters') : ''}
          openButtonIcon={<FilterIcon size={18} />}
          openButtonClassName="flex flex-row gap-1"
          open={isFilterOpened}
          setOpen={setIsFilterOpened}
          bodyClassName="min-w-[500px]"
        >
          <ProductOrderFilters
            onFilters={onFilters}
            initialFilters={filterParams}
          />
        </DrawerLayout>
        <Button
          type="button"
          size="sm"
          title={t('orders.exportExcel')}
          variant="save"
          onClick={() => {
            setSelectedRows(table.getRowModel().rows);
            openExportExcelModal();
          }}
        >
          <IconFileExcel size={18} />
          {!isMobile ? t('orders.exportExcel') : ''}
        </Button>
      </div>
    ),
  });

  const handleAddOrder = () => {
    openModal({
      isOpen: true,
      title: t('orders.addOrderModalTitle'),
      description: '',
      modalContent: <ProductOrderForm />,
      customSize: 'lg:!max-w-[800px] lg:!min-h-[600px]',
    });
  };

  const onFilters = (data: ProductOrderFilterFormData) => {
    setFilterParams(data);
    setIsFilterOpened(false);
  };

  const handleEditOrder = useCallback(
    (row: ProductOrderFormData) => {
      openModal({
        isOpen: true,
        title: t('orders.updateOrderModalTitle'),
        description: t('orders.updateOrderModalContent', {
          orderCode: row.orderCode,
        }),
        modalContent: <ProductOrderForm rowData={row} />,
        customSize: 'lg:!min-w-[800px]',
      });
    },
    [openModal, t]
  );

  const handleApproveOrder = useCallback(
    (row: ProductOrderFormData) => {
      openModal({
        isOpen: true,
        title: t('orders.approveOrderModalTitle'),
        description: t('orders.approveOrderModalContent', {
          orderCode: String(row.orderCode ?? ''),
        }),
        modalContent: (
          <ProductOrderApprove
            orderCode={String(row.orderCode ?? '')}
            approvedStatus={row.orderStatus as OrderStatus}
          />
        ),
      });
    },
    [openModal, t]
  );

  const openDeleteConfirmModal = useCallback(
    (rows: ProductOrderFormData) => {
      openAlertModal({
        isOpen: true,
        title: t('orders.deleteOrderModalTitle'),
        message: t('orders.deleteOrderModalContent', {
          orderCode: rows.orderCode,
        }),
        onConfirm: async () => {
          await deleteOrder(String(rows.orderCode));
          closeAlertModal();
        },
        onCancel: closeAlertModal,
      });
    },
    [openAlertModal, t, closeAlertModal, deleteOrder]
  );

  const handleActionClick = useCallback(() => {
    switch (actionType) {
      case 'delete':
        openDeleteConfirmModal(actionData as ProductOrderFormData);
        break;
      case 'edit':
        handleEditOrder(actionData as ProductOrderFormData);
        break;
      case 'approve':
        handleApproveOrder(actionData as ProductOrderFormData);
        break;
      default:
        break;
    }
  }, [
    actionType,
    actionData,
    handleEditOrder,
    handleApproveOrder,
    openDeleteConfirmModal,
  ]);

  const openExportExcelModal = () => {
    openModal({
      isOpen: true,
      title: t('orders.exportExcel'),
      description: '',
      modalContent: (
        <div className="flex flex-col gap-4 mt-6">
          <RadioGroup
            defaultValue={exportExcelType}
            onValueChange={(value) =>
              setExportExcelType(value as ExportExcelType)
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="r1" />
              <Label htmlFor="r1" className="cursor-pointer">
                {tCommon('exportAll')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="page" id="r2" />
              <Label htmlFor="r2" className="cursor-pointer">
                {tCommon('exportByPage')}
              </Label>
            </div>
          </RadioGroup>
          <div className="flex flex-row justify-end items-center gap-2">
            <Button
              type="button"
              size="sm"
              title={tCommon('btnCancel')}
              onClick={() => closeModal(false)}
              disabled={exportStatus === 'pending'}
              variant="outline"
              className=" flex flex-row gap-1"
            >
              <XIcon size={16} />
              {tCommon('btnCancel')}
            </Button>
            <Button
              type="button"
              size="sm"
              title={tCommon('btnExport')}
              onClick={handleExportExcel}
              disabled={exportStatus === 'pending'}
              loading={exportStatus === 'pending'}
              variant="save"
              className=" flex flex-row gap-1"
            >
              <IconCheck size={16} />
              {tCommon('btnOk')}
            </Button>
          </div>
        </div>
      ),
    });
  };

  const handleExportRows = () => {
    const csv = generateCsv(csvConfig)(
      convertToOrderExcelData(selectedRows as any[], locale)
    );
    download(csvConfig)(csv);
  };

  const handleExportExcel = async () => {
    if (exportExcelType === 'all') {
      await mutateExportData({ ...filterParams, isExport: true });
      return;
    }

    handleExportRows();
  };

  useEffect(() => {
    if (isFetchingOrders || ordersData?.type === 'error') return;

    const orders = get(ordersData?.result, RESPONSE_OBJ_KEY, null);
    setOrders({
      data: get(orders, 'data', []),
      meta: get(orders, 'meta', {
        take: PAGE_SIZE,
        page: 0,
        pageCount: 0,
      }),
    });
  }, [ordersData, isFetchingOrders]);

  useEffect(() => {
    if (deleteOrderStatus === 'pending' || !isRefresh) return;
    refetchOrders().finally();
  }, [pagination, isRefresh, refetchOrders, filterParams, deleteOrderStatus]);

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

  useEffect(() => {
    if (actionType) {
      handleActionClick();
      setActionType('', null);
    }
  }, [actionType, setActionType, handleActionClick]);

  return <DataTable table={table} />;
}
