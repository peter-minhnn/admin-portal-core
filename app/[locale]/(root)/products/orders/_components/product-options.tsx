import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  MRT_RowSelectionState,
  useMaterialReactTable,
} from 'material-react-table';
import { useGetProductOptions } from '../../_hooks/use-queries';
import { useQueryClient } from '@tanstack/react-query';
import { FilterIcon } from 'lucide-react';
import {
  ProductPriceFilterParams,
  ProductPriceType,
} from '@/types/product.type';
import { ListResponseType, PaginationState } from '@/types/common.type';
import { PAGE_SIZE } from '@/shared/enums';
import DataTable from '@/components/data-table';
import { DataTableProps } from '@/shared/data-table-props';
import DrawerLayout from '@/components/drawer-layout';
import { useIsMobile } from '@/hooks/use-mobile';
import ProductPriceFilters from '@/app/[locale]/(root)/products/prices/_components/product-price-filters';
import useProductPriceColumns from '@/app/[locale]/(root)/products/_hooks/use-product-price-columns';
import { Locale } from '@/shared/configs/i18n/config';

type ProductOptionsProps = {
  setRowSelection: Dispatch<SetStateAction<ProductPriceType | null>>;
};

export default function ProductOptions({
  setRowSelection,
}: Readonly<ProductOptionsProps>) {
  const t = useTranslations('ProductMessages');
  const tCommon = useTranslations('CommonMessages');
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();
  const locale = useLocale() as Locale;

  const [rowSelectionState, setRowSelectionState] =
    useState<MRT_RowSelectionState>({});

  const [products, setProducts] = useState<ListResponseType<ProductPriceType>>({
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
  const [filterParams, setFilterParams] = useState<ProductPriceFilterParams>({
    productCode: '',
  });
  const [isFilterOpened, setIsFilterOpened] = useState(false);

  const {
    isFetching: isFetchingProducts,
    data: productsData,
    refetch: refetchProducts,
    isRefetching: isRefetchingGetProducts,
  } = useGetProductOptions(pagination, filterParams);

  const productColumns = useProductPriceColumns({ t });

  const table = useMaterialReactTable({
    ...DataTableProps(locale),
    columns: productColumns,
    data: products?.data ?? [],
    rowCount: products?.meta?.itemCount ?? 0,
    pageCount: products?.meta?.pageCount ?? 0,
    getRowId: (row) => row.productCode,
    enableColumnPinning: true,
    enableRowPinning: true,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelectionState,
    onPaginationChange: setPagination, //hoist pagination state to your state when it changes internally
    state: {
      pagination,
      isLoading: isFetchingProducts,
      showProgressBars: isRefetchingGetProducts,
      rowSelection: rowSelectionState,
    }, //pass the pagination state to the table
    muiTablePaperProps: {
      sx: {
        height: '530px',
      },
    },
    initialState: {
      columnVisibility: {
        actions: false,
        productImage: false,
      },
    },
    renderTopToolbarCustomActions: () => (
      <div className="flex justify-start gap-1 w-fit">
        <DrawerLayout
          headerTitle={tCommon('btnAdvancedFilters')}
          openButtonLabel={!isMobile ? tCommon('btnAdvancedFilters') : ''}
          openButtonIcon={<FilterIcon size={18} />}
          openButtonClassName="flex flex-row gap-1"
          open={isFilterOpened}
          setOpen={setIsFilterOpened}
        >
          <ProductPriceFilters
            onFilters={onFilters}
            initialFilters={filterParams}
            pagination={pagination}
          />
        </DrawerLayout>
      </div>
    ),
  });

  const onFilters = async (data: ProductPriceFilterParams) => {
    setIsFilterOpened(false);
    setFilterParams({ ...data });
    await queryClient.invalidateQueries({ queryKey: ['products'] });
  };

  useEffect(() => {
    if (isFetchingProducts || productsData?.type === 'error') return;
    setProducts(productsData?.result.data);
  }, [productsData, isFetchingProducts]);

  useEffect(() => {
    refetchProducts().finally();
  }, [pagination, refetchProducts]);

  useEffect(() => {
    if (!Object.keys(rowSelectionState).length) return;

    Object.keys(rowSelectionState).forEach((key: string) => {
      const selectedRow = products.data.find((row) => row.productCode === key);
      if (selectedRow) {
        setRowSelection(selectedRow);
      }
    });
  }, [rowSelectionState, setRowSelection, products]);

  return <DataTable table={table} />;
}
