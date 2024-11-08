"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import LayoutContentSection from "@/components/layouts/layout-section";
import ProductForm from "./product-form";
import { useModal } from "@/hooks/use-modal";
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
} from "@/app/[locale]/(root)/products/_hooks/use-queries";
import { ProductFormData, UnitType } from "@/types/product.type";
import {
  CommonCodeType,
  ListResponseType,
  PaginationState,
} from "@/types/common.type";
import { PAGE_SIZE } from "@/shared/enums";
import DataTable from "@/components/data-table";
import useProductColumns from "@/app/[locale]/(root)/products/_hooks/use-product-columns";
import { Box } from "@mui/material";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react";
import { DataTableProps } from "@/shared/data-table-props";

export default function ProductListPage() {
  const t = useTranslations("ProductMessages");
  const tCommon = useTranslations("CommonMessages");
  const { openModal, closeModal } = useModal();
  const [units, setUnits] = useState<UnitType[]>([]);
  const [productTypes, setProductTypes] = useState<CommonCodeType[]>([]);
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

  const { isFetching: isFetchingUnits, data: unitsData } = useGetUnits();
  const { isFetching: isFetchingProductTypes, data: productTypesData } =
    useGetProductTypes();
  const {
    isFetching: isFetchingProducts,
    data: productsData,
    refetch: refetchProducts,
    isRefetching: isRefetchingGetProducts,
  } = useGetProducts(pagination);
  const { mutateAsync: deleteProduct, status: deleteMutateStatus } =
    useDeleteProduct(t, closeModal);
  const productColumns = useProductColumns(t);

  const table = useMaterialReactTable({
    ...DataTableProps(tCommon),
    columns: productColumns,
    data: products.data,
    rowCount: products.meta.itemCount ?? 0,
    pageCount: products.meta.pageCount ?? 0,
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
      columnPinning: {
        left: ["mrt-row-pin", "mrt-row-actions", "productCode"],
      },
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
      <Box sx={{ display: "flex" }}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="sm"
                title={t("addProductModalTitle")}
                onClick={handleAddProduct}
              >
                <PlusIcon />
                {t("addProductModalTitle")}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t("addProductModalTitle")}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Box>
    ),
  });

  const handleAddProduct = () => {
    openModal({
      isOpen: true,
      title: t("addProductModalTitle"),
      description: "",
      modalContent: <ProductForm units={units} productTypes={productTypes} />,
      customSize: "lg:!min-w-[800px]",
    });
  };

  const handleEditProduct = (row: RowCell<ProductFormData>) => {
    openModal({
      isOpen: true,
      title: t("editProductModalTitle"),
      description: "",
      modalContent: (
        <ProductForm units={units} productTypes={productTypes} rowData={row} />
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

  useEffect(() => {
    if (isFetchingUnits || !unitsData?.length) return;
    setUnits(unitsData);
  }, [unitsData, isFetchingUnits]);

  useEffect(() => {
    if (isFetchingProductTypes || !productTypesData?.length) return;
    setProductTypes(productTypesData);
  }, [productTypesData, isFetchingProductTypes]);

  useEffect(() => {
    if (isFetchingProducts || productsData?.type === "error") return;
    setProducts(productsData?.result);
  }, [productsData, isFetchingProducts]);

  useEffect(() => {
    refetchProducts();
  }, [pagination, refetchProducts]);

  return (
    <LayoutContentSection title={t("title")} desc={"ddd"}>
      <DataTable table={table} />
    </LayoutContentSection>
  );
}
