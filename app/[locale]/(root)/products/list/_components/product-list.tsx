'use client';

import { useCallback, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useMaterialReactTable } from 'material-react-table';
import {
  useDeleteProduct,
  useGetProducts,
  useGetProductTypes,
  useGetUnits,
  useUpdateProduct,
} from '../../_hooks/use-queries';
import { useQueryClient } from '@tanstack/react-query';
import { FilterIcon, PlusIcon } from 'lucide-react';
import get from 'lodash/get';
import {
  ProductFilterParams,
  ProductFormData,
  ProductType,
  UnitType,
} from '@/types/product.type';
import {
  CommonCodeType,
  ListResponseType,
  PaginationState,
} from '@/types/common.type';
import { PAGE_SIZE } from '@/shared/enums';
import DataTable from '@/components/data-table';
import useProductColumns from '../../_hooks/use-product-columns';
import { DataTableProps } from '@/shared/data-table-props';
import { useWindowSize } from '@/hooks/use-window-size';
import DrawerLayout from '@/components/drawer-layout';
import ProductFilters from './product-filters';
import { useIsMobile } from '@/hooks/use-mobile';
import ProductPriceForm from '../../_components/product-price-form';
import { Button } from '@/components/ui/button';
import ProductForm from './product-form';
import { useModal } from '@/hooks/use-modal';
import { useAlertModal } from '@/hooks/use-alert-modal';
import { useActionsButtonStore } from '@/states/common.state';
import { Locale } from '@/shared/configs/i18n/config';
import { RESPONSE_OBJ_KEY } from '@/shared/constants';

export default function ProductList() {
  const t = useTranslations('ProductMessages');
  const tCommon = useTranslations('CommonMessages');
  const { openModal, closeModal, isClosed, isOpen } = useModal();
  const { openAlertModal, closeAlertModal } = useAlertModal();
  const isMobile = useIsMobile();
  const { width } = useWindowSize();
  const queryClient = useQueryClient();
  const { actionType, actionData, setActionType } = useActionsButtonStore();
  const locale = useLocale() as Locale;

  const [products, setProducts] = useState<ListResponseType<ProductFormData>>({
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
  const [filterParams, setFilterParams] = useState<ProductFilterParams>({
    content: '',
    productType: '',
  });
  const [isFilterOpened, setIsFilterOpened] = useState(false);

  const { data: unitsData } = useGetUnits();
  const { data: productTypesData } = useGetProductTypes();
  const {
    isFetching: isFetchingProducts,
    data: productsData,
    refetch: refetchProducts,
  } = useGetProducts(pagination, filterParams);

  const { mutateAsync: updateProduct } = useUpdateProduct(t, closeModal);

  const { mutateAsync: deleteProduct, status: deleteMutateStatus } =
    useDeleteProduct(t, closeModal);

  const productColumns = useProductColumns({ t });

  const table = useMaterialReactTable({
    ...DataTableProps(locale),
    columns: productColumns,
    data: products?.data ?? [],
    rowCount: products?.meta?.itemCount ?? 0,
    pageCount: products?.meta?.pageCount ?? 0,
    getRowId: (row) => row.productCode,
    enableColumnPinning: true,
    enableRowPinning: true,
    onPaginationChange: setPagination, //hoist pagination state to your state when it changes internally
    state: {
      pagination,
      isLoading: isFetchingProducts && !isOpen,
    }, //pass the pagination state to the table
    initialState: {
      columnSizing: { 'mrt-row-actions': 120 },
    },
    renderTopToolbarCustomActions: () => (
      <div className="flex justify-start gap-2 w-fit">
        <Button
          type="button"
          size="sm"
          title={t('addProductModalTitle')}
          onClick={handleAddProduct}
          variant="blueShine"
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
          <ProductFilters
            productTypes={(productTypesData as CommonCodeType[]) ?? []}
            onFilters={onFilters}
            initialFilters={filterParams}
          />
        </DrawerLayout>
      </div>
    ),
  });

  const handleAddProduct = () => {
    openModal({
      isOpen: true,
      title: t('addProductModalTitle'),
      description: '',
      modalContent: (
        <ProductForm
          units={(unitsData as UnitType[]) ?? []}
          productTypes={(productTypesData as CommonCodeType[]) ?? []}
        />
      ),
      customSize: 'lg:!min-w-[800px]',
    });
  };

  const handleEditProduct = useCallback(
    (row: ProductFormData) => {
      openModal({
        isOpen: true,
        title: t('editProductModalTitle'),
        description: '',
        modalContent: (
          <ProductForm
            units={(unitsData as UnitType[]) ?? []}
            productTypes={(productTypesData as CommonCodeType[]) ?? []}
            rowData={row}
          />
        ),
        customSize: 'lg:!min-w-[800px]',
      });
    },
    [productTypesData, unitsData, openModal, t]
  );

  const openDeleteConfirmModal = useCallback(
    (rows: ProductFormData) => {
      openAlertModal({
        isOpen: true,
        title: t('deleteProductModalTitle'),
        message: t('deleteProductModalContent', {
          productName: rows.productName,
        }),
        onConfirm: async () => {
          await deleteProduct(rows.productCode);
          closeAlertModal();
        },
        onCancel: closeAlertModal,
      });
    },
    [openAlertModal, t, closeAlertModal, deleteProduct]
  );

  const handleUpdateProductPrice = useCallback(
    (row: ProductFormData) => {
      openModal({
        isOpen: true,
        title: t('editProductModalTitle'),
        description: '',
        modalContent: <ProductPriceForm rowData={row} />,
      });
    },
    [openModal, t]
  );

  const openUpdateStatusConfirmModal = useCallback(
    (rows: ProductFormData) => {
      openAlertModal({
        isOpen: true,
        title: t('updateProductStatusTitle'),
        message: t('notifications.updateProductStatusQuestion', {
          productName: rows.productName,
          productCode: rows.productCode,
          bOpen: '<b>',
          bClose: '</b>',
        }),
        onConfirm: async () => {
          const obj = {
            ...rows,
            companyId: rows.companyId ?? 1,
            isActive: rows.isActive,
          } as ProductType;

          await updateProduct(obj);
          closeAlertModal();
        },
        onCancel: closeAlertModal,
      });
    },
    [openAlertModal, t, closeAlertModal, updateProduct]
  );

  const onFilters = async (data: ProductFilterParams) => {
    setIsFilterOpened(false);
    setFilterParams({ ...data });
    await queryClient.invalidateQueries({ queryKey: ['products'] });
  };

  const handleActionClick = useCallback(() => {
    switch (actionType) {
      case 'delete':
        openDeleteConfirmModal(actionData as ProductFormData);
        break;
      case 'edit':
        handleEditProduct(actionData as ProductFormData);
        break;
      case 'updatePrice':
        handleUpdateProductPrice(actionData as ProductFormData);
        break;
      case 'update-status':
        openUpdateStatusConfirmModal(actionData as ProductFormData);
        break;
      default:
        break;
    }
  }, [
    actionType,
    actionData,
    handleEditProduct,
    handleUpdateProductPrice,
    openDeleteConfirmModal,
    openUpdateStatusConfirmModal,
  ]);

  useEffect(() => {
    if (isFetchingProducts || productsData?.type === 'error') return;
    const products = get(productsData?.result, RESPONSE_OBJ_KEY, null);
    setProducts({
      data: get(products, 'data', []),
      meta: get(products, 'meta', {
        take: PAGE_SIZE,
        page: 0,
        pageCount: 0,
      }),
    });
  }, [productsData, isFetchingProducts]);

  useEffect(() => {
    if (deleteMutateStatus === 'pending') return;
    refetchProducts().finally();
  }, [pagination, isClosed, refetchProducts, deleteMutateStatus]);

  useEffect(() => {
    if (width > 1280) {
      table.initialState.columnPinning = {
        left: ['mrt-row-pin', 'productCode'],
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
