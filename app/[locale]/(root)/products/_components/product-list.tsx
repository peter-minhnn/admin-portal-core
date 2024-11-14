"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {IconCoin, IconX} from "@tabler/icons-react";
import {
  MRT_ActionMenuItem as ActionMenuItem,
  MRT_Row as RowCell,
  useMaterialReactTable,
} from "material-react-table";
import {
  useDeleteProduct,
  useGetProducts,
  useGetProductTypes,
  useGetUnits,
} from "../_hooks/use-queries";
import {useQueryClient} from "@tanstack/react-query";
import { Box } from "@mui/material";
import {EditIcon, FilterIcon, PlusIcon, TrashIcon} from "lucide-react";
import {ProductFilterParams, ProductFormData} from "@/types/product.type";
import { ListResponseType, PaginationState } from "@/types/common.type";
import { PAGE_SIZE } from "@/shared/enums";
import DataTable from "@/components/data-table";
import useProductColumns from "../_hooks/use-product-columns";
import { DataTableProps } from "@/shared/data-table-props";
import { useWindowSize } from "@/hooks/use-window-size";
import DrawerLayout from "@/components/drawer-layout";
import ProductFilters from "./product-filters";
import {useIsMobile} from "@/hooks/use-mobile";
import ProductPrice from "./product-price";
import { Button } from "@/components/ui/button";
import ProductForm from "./product-form";
import { useModal } from "@/hooks/use-modal";

export default function ProductListPage() {
  const t = useTranslations("ProductMessages");
  const tCommon = useTranslations("CommonMessages");
  const { openModal, closeModal } = useModal();
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
    content: "",
    productType: "",
  })
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const isMobile = useIsMobile();
  const { width } = useWindowSize();
  const queryClient = useQueryClient();

  const { data: unitsData } = useGetUnits();
  const { data: productTypesData } = useGetProductTypes();
  const {
    isFetching: isFetchingProducts,
    data: productsData,
    refetch: refetchProducts,
    isRefetching: isRefetchingGetProducts,
  } = useGetProducts(pagination, filterParams);

  const { mutateAsync: deleteProduct, status: deleteMutateStatus } =
    useDeleteProduct(t, closeModal, filterParams, pagination);

  const productColumns = useProductColumns(t);

  const table = useMaterialReactTable({
    ...DataTableProps(tCommon),
    columns: productColumns,
    data: products.data ?? [],
    rowCount: products?.meta?.itemCount ?? 0,
    pageCount: products?.meta?.pageCount ?? 0,
    getRowId: (row) => row.productCode,
    onPaginationChange: setPagination, //hoist pagination state to your state when it changes internally
    state: {
      pagination,
      isLoading: isFetchingProducts,
      showProgressBars: isRefetchingGetProducts,
    }, //pass the pagination state to the table
    enableRowActions: true,
    enableRowPinning: true,
    initialState: {
      columnSizing: { "mrt-row-actions": 120 },
    },
    renderRowActionMenuItems: ({ row, table, closeMenu }) => [
      <ActionMenuItem
        icon={<EditIcon />}
        key="edit"
        label={t("editProductModalTitle")}
        onClick={() => {
          handleEditProduct(row);
          closeMenu();
        }}
        table={table}
      />,
      <ActionMenuItem
        icon={<IconCoin />}
        key="updatePrice"
        label={t("updateProductPrice")}
        onClick={() => {
          handleUpdateProductPrice(row);
          closeMenu();
        }}
        table={table}
      />,
      <ActionMenuItem
        icon={<TrashIcon />}
        key="delete"
        label={t("deleteProductModalTitle")}
        onClick={() => {
          openDeleteConfirmModal(row);
          closeMenu();
        }}
        table={table}
      />,
    ],
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: "flex", gap: "5px", width: "100%", justifyContent: "space-between" }}>
        <Button
            type="button"
            size="sm"
            title={t("addProductModalTitle")}
            onClick={handleAddProduct}
        >
          <PlusIcon size={18}/>
          {!isMobile ? t("addProductModalTitle") : ""}
        </Button>
        <DrawerLayout
            headerTitle={tCommon("btnAdvancedFilters")}
            openButtonLabel={!isMobile ? tCommon("btnAdvancedFilters") : ""}
            openButtonIcon={<FilterIcon size={18} />}
            openButtonClassName="flex flex-row gap-1"
            open={isFilterOpened}
            setOpen={setIsFilterOpened}
        >
          <ProductFilters productTypes={productTypesData} onFilters={onFilters} initialFilters={filterParams}/>
        </DrawerLayout>
      </Box>
    ),
  });

  const handleAddProduct = () => {
    openModal({
      isOpen: true,
      title: t("addProductModalTitle"),
      description: "",
      modalContent: (
        <ProductForm
            units={unitsData}
            productTypes={productTypesData}
            filterParams={filterParams}
            pagination={pagination
        }/>
      ),
      customSize: "lg:!min-w-[800px]",
    });
  };

  const handleEditProduct = (row: RowCell<ProductFormData>) => {
    openModal({
      isOpen: true,
      title: t("editProductModalTitle"),
      description: "",
      modalContent: (
        <ProductForm
          units={unitsData}
          productTypes={productTypesData}
          rowData={row}
          filterParams={filterParams}
          pagination={pagination}
        />
      ),
      customSize: "lg:!min-w-[800px]",
    });
  };

  const openDeleteConfirmModal = (rows: RowCell<ProductFormData>) => {
    openModal({
      isOpen: true,
      title: t("deleteProductModalTitle"),
      description: t("deleteProductModalContent", {
        productName: rows.getValue("productName"),
      }),
      modalContent: (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            {t("deleteProductModalDesc")}
          </p>
          <div className="flex justify-center gap-1">
            <Button
              type="button"
              title={t("modalCancelBtn")}
              size="sm"
              variant="secondary"
              onClick={closeModal}
              disabled={deleteMutateStatus === "pending"}
              loading={deleteMutateStatus === "pending"}
            >
              <IconX size={16} />
              {t("modalCancelBtn")}
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              title={t("modalDeleteBtn")}
              onClick={async () => {
                await deleteProduct(rows.getValue("productCode"));
              }}
              disabled={deleteMutateStatus === "pending"}
              loading={deleteMutateStatus === "pending"}
            >
              <TrashIcon size={16} />
              {t("modalDeleteBtn")}
            </Button>
          </div>
        </div>
      ),
    });
  };

  const handleUpdateProductPrice = (row: RowCell<ProductFormData>) => {
    openModal({
      isOpen: true,
      title: t("editProductModalTitle"),
      description: "",
      modalContent: (
          <ProductPrice row={row}/>
      ),
      customSize: "lg:!min-w-[800px]",
    });
  };

  const onFilters = async (data: ProductFilterParams) => {
    console.log(data);
    setIsFilterOpened(false);
    setFilterParams({...data});
    await queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  useEffect(() => {
    if (isFetchingProducts || productsData?.type === "error") return;
    setProducts(productsData?.result);
  }, [productsData, isFetchingProducts]);

  useEffect(() => {
    refetchProducts();
  }, [pagination, refetchProducts]);

  useEffect(() => {
    if (width > 1280) {
      table.initialState.columnPinning = {
        left: ["mrt-row-pin", "mrt-row-actions", "productCode"],
      };
    } else {
      table.initialState.columnPinning = {};
    }
  }, [width, table]);

  return (
      <DataTable table={table} />
  );
}
