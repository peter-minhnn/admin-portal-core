'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import {
  ListResponseType,
  MetaType,
  PaginationState,
} from '@/types/common.type';
import { PAGE_SIZE } from '@/shared/enums';
import {
  ProductPriceFilterParams,
  ProductPriceType,
} from '@/types/product.type';
import { useGetProductPrices } from '@/app/[locale]/(root)/products/_hooks/use-queries';
import { useMaterialReactTable } from 'material-react-table';
import { DataTableProps } from '@/shared/data-table-props';
import useProductPriceColumns from '@/app/[locale]/(root)/products/_hooks/use-product-price-columns';
import DataTable from '@/components/data-table';
import { useModal } from '@/hooks/use-modal';
import { useWindowSize } from '@/hooks/use-window-size';
import { useActionsButtonStore } from '@/states/common.state';
import { generateUniqueId } from '@/shared/lib';
import get from 'lodash/get';
import { META_KEY, RESPONSE_LIST_KEY } from '@/shared/constants';
import DrawerLayout from '@/components/drawer-layout';
import { useIsMobile } from '@/hooks/use-mobile';
import { FilterIcon } from 'lucide-react';
import ProductPriceFilters from '@/app/[locale]/(root)/products/prices/_components/product-price-filters';
import { useQueryClient } from '@tanstack/react-query';
import ProductPriceForm from '@/app/[locale]/(root)/products/_components/product-price-form';

export default function ProductPriceList() {
  const t = useTranslations('ProductMessages');
  const tCommon = useTranslations('CommonMessages');
  const { openModal, isClosed } = useModal();
  const { width } = useWindowSize();
  const isUseProductPriceMobile = useIsMobile();
  const queryClient = useQueryClient();
  const { setActionType, actionType, actionData } = useActionsButtonStore();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });
  const [filters, setFilters] = useState<ProductPriceFilterParams>({
    productCode: '',
    take: PAGE_SIZE,
    page: 1,
  });
  const [isFilterOpened, setIsFilterOpened] = useState<boolean>(false);
  const [productPrices, setProductPrices] = useState<
    ListResponseType<ProductPriceType>
  >({
    data: [],
    meta: {
      take: PAGE_SIZE,
      page: 0,
      pageCount: 0,
    },
  });

  const {
    data,
    isFetching: isFetchingPrices,
    refetch: refetchPrices,
    isRefetching: isRefetchingPrices,
  } = useGetProductPrices({
    ...filters,
    page: pagination.pageIndex + 1,
    take: pagination.pageSize,
  });

  const productPriceColumns = useProductPriceColumns({ t });

  const table = useMaterialReactTable({
    ...DataTableProps(tCommon),
    columns: productPriceColumns,
    data: productPrices.data ?? [],
    rowCount: productPrices.meta.itemCount ?? 0,
    pageCount: productPrices?.meta?.pageCount ?? 0,
    getRowId: (row) => row.id!,
    enableColumnPinning: true,
    onPaginationChange: setPagination, //hoist pagination state to your state when it changes internally
    state: {
      pagination,
      isLoading: isFetchingPrices || isRefetchingPrices,
      showProgressBars: isFetchingPrices || isRefetchingPrices,
    }, //pass the pagination state to the table
    renderTopToolbarCustomActions: () => (
      <div className="flex justify-end gap-1 w-full">
        <DrawerLayout
          headerTitle={tCommon('btnAdvancedFilters')}
          openButtonLabel={
            !isUseProductPriceMobile ? tCommon('btnAdvancedFilters') : ''
          }
          openButtonIcon={<FilterIcon size={18} />}
          openButtonClassName="flex flex-row gap-1"
          open={isFilterOpened}
          setOpen={setIsFilterOpened}
        >
          <ProductPriceFilters
            onFilters={onFilters}
            initialFilters={filters}
            pagination={pagination}
          />
        </DrawerLayout>
      </div>
    ),
  });

  const onFilters = async (data: ProductPriceFilterParams) => {
    setIsFilterOpened(false);
    setFilters({ ...data });
    await queryClient.invalidateQueries({
      queryKey: ['product-price', pagination],
    });
  };

  const handleEditPrices = useCallback(() => {
    openModal({
      isOpen: true,
      title: t('editProductPrice'),
      description: '',
      modalContent: <ProductPriceForm rowData={actionData} />,
    });
  }, [actionData, openModal, t]);

  const handleActionClick = useCallback(() => {
    if (actionType === 'edit') {
      handleEditPrices();
    }
  }, [actionType, handleEditPrices]);

  useEffect(() => {
    if (isFetchingPrices || data?.type === 'error') return;
    const list = get(data?.result, RESPONSE_LIST_KEY, []) as ProductPriceType[];
    setProductPrices({
      meta: get(data?.result, META_KEY, {}) as MetaType,
      data: list.map((v) => ({ ...v, id: generateUniqueId() })),
    });
  }, [isFetchingPrices, data]);

  useEffect(() => {
    refetchPrices().finally();
  }, [pagination, refetchPrices, isClosed]);

  useEffect(() => {
    if (width > 1280) {
      table.initialState.columnPinning = {
        left: ['price', 'originalPrice'],
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
