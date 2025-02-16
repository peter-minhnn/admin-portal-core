'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import get from 'lodash/get';
import { useModal } from '@/hooks/use-modal';
import { useWindowSize } from '@/hooks/use-window-size';
import { useActionsButtonStore } from '@/states/common.state';
import { Locale } from '@/shared/configs/i18n/config';
import { PAGE_SIZE } from '@/shared/enums';
import { ListResponseType, PaginationState } from '@/types/common.type';
import { CustomerType } from '@/types/customer.type';
import {
  useCustomersExport,
  useGetCustomers,
} from '@/app/[locale]/(root)/products/_hooks/use-queries';
import { RESPONSE_OBJ_KEY } from '@/shared/constants';
import { useMaterialReactTable } from 'material-react-table';
import { DataTableProps } from '@/shared/data-table-props';
import useCustomerColumns from '@/app/[locale]/(root)/customers/_hooks/use-customer-columns';
import DataTable from '@/components/data-table';
import CustomerForm from '@/app/[locale]/(root)/customers/_components/customer-form';
import { CustomerActive } from '@/app/[locale]/(root)/customers/_components/customer-active';
import { useAlertModal } from '@/hooks/use-alert-modal';
import { useCustomerResetPassword } from '@/app/[locale]/(root)/customers/_hooks/use-queries';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { copyToClipboard } from '@/shared/lib';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { IconFileExcel } from '@tabler/icons-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { PlusIcon } from 'lucide-react';

export default function CustomerList() {
  const t = useTranslations('CustomerMessages');
  const tCommon = useTranslations('CommonMessages');
  const { openModal, isClosed, isOpen, isRefresh, closeModal } = useModal();
  const { openAlertModal, closeAlertModal } = useAlertModal();
  const { width } = useWindowSize();
  const { actionType, actionData, setActionType } = useActionsButtonStore();
  const locale = useLocale() as Locale;
  const isMobile = useIsMobile();

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
  const [isSaved, setIsSaved] = useState<{
    success: boolean;
    data: CustomerType | null;
  }>({ success: false, data: null });

  const {
    data: customerData,
    isFetching,
    refetch,
    status,
  } = useGetCustomers(
    {
      pageIndex: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
    },
    isOpen ? 'dialog' : 'list'
  );

  const { mutateAsync: mutateExportData, status: exportStatus } =
    useCustomersExport(t);

  const customerColumns = useCustomerColumns({ t });

  const { mutateAsync: resetPwdMutateAsync } = useCustomerResetPassword(
    t,
    closeAlertModal
  );

  const handleCreateCustomer = useCallback(() => {
    openModal({
      isOpen: true,
      title: t('createUser'),
      description: '',
      modalContent: <CustomerForm setIsSaved={setIsSaved} />,
    });
  }, [openModal, t]);

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
      isLoading: isFetching && !isOpen && isRefresh,
    }, //pass the pagination state to the table
    initialState: {
      columnSizing: { 'mrt-row-actions': 120 },
    },
    renderTopToolbarCustomActions: () => (
      <div className="flex justify-start gap-2 w-fit">
        <Button
          type="button"
          size="sm"
          title={t('createUser')}
          onClick={handleCreateCustomer}
          variant="blueShine"
        >
          <PlusIcon size={18} />
          {!isMobile ? t('createUser') : ''}
        </Button>
        <Button
          type="button"
          size="sm"
          title={tCommon('exportExcel')}
          variant="save"
          onClick={async () => await mutateExportData()}
          loading={exportStatus === 'pending'}
        >
          <IconFileExcel size={18} />
          {!isMobile ? tCommon('exportExcel') : ''}
        </Button>
      </div>
    ),
  });

  const openEditCustomerModal = useCallback(() => {
    openModal({
      isOpen: true,
      title: t('editCustomerModalTitle'),
      description: '',
      modalContent: <CustomerForm rowData={actionData} />,
    });
  }, [actionData, openModal, t]);

  const openActiveCustomerModal = useCallback(() => {
    openModal({
      isOpen: true,
      title: t('editStatusCustomerModalTitle'),
      description: '',
      modalContent: <CustomerActive rowData={actionData} />,
    });
  }, [actionData, openModal, t]);

  const openCustomerResetPwdModal = useCallback(() => {
    openAlertModal({
      isOpen: true,
      title: t('resetPasswordAlertTitle'),
      message: t('resetPasswordAlertContent', {
        email: actionData.email,
      }),
      onConfirm: async () =>
        await resetPwdMutateAsync({ email: actionData.email as string }),
      onCancel: closeAlertModal,
    });
  }, [actionData, openAlertModal, t, resetPwdMutateAsync, closeAlertModal]);

  const handleActionClick = useCallback(() => {
    switch (actionType) {
      case 'edit':
        openEditCustomerModal();
        break;
      case 'update-status':
        openActiveCustomerModal();
        break;
      case 'reset-password':
        openCustomerResetPwdModal();
        break;
      default:
        break;
    }
  }, [
    actionType,
    openEditCustomerModal,
    openActiveCustomerModal,
    openCustomerResetPwdModal,
  ]);

  const handleShowPwdCreated = useCallback(
    (data: { password: string }) => {
      setIsSaved({ success: false, data: null });
      closeModal();
      openModal({
        isOpen: true,
        title: t('newPassword'),
        description: '',
        isRefresh: false,
        modalContent: (
          <div className="flex flex-row items-center justify-center mt-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge
                    variant="primary"
                    className="flex flex-row gap-2"
                    onClick={async () => {
                      await copyToClipboard(data?.password ?? '');
                      toast.success(tCommon('copyTextSuccess'));
                    }}
                  >
                    <span className="font-semibold text-lg">
                      {data?.password}
                    </span>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>{tCommon('btnClickToCopy')}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ),
      });
    },
    [closeAlertModal, openModal, t, tCommon]
  );

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

  useEffect(() => {
    if (!isRefresh) return;
    refetch().finally();
  }, [pagination, isClosed, refetch, isRefresh]);

  useEffect(() => {
    if (width > 1280) {
      table.initialState.columnPinning = {
        left: ['mrt-row-pin'],
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

  useEffect(() => {
    if (!isSaved.success) return;
    const password = get(isSaved.data, 'password', '');
    handleShowPwdCreated({ password: password });
  }, [isSaved, handleShowPwdCreated]);

  return <DataTable table={table} />;
}
