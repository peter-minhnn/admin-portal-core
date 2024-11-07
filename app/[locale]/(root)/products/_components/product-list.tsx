"use client";

import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import get from "lodash/get";
import {Button} from "@/components/ui/button";
import LayoutContentSection from "@/components/layouts/layout-section";
import ProductForm from "./product-form";
import {IconPlus} from "@tabler/icons-react";
import {ProductType, UnitType} from "@/types/product.type";
import {useQuery} from "@tanstack/react-query";
import {getProducts, getProductTypes, getUnits} from "@/services/product.service";
import {useModal} from "@/hooks/use-modal";
import {CommonCodeType, ListResponseType, PaginationState} from "@/types/common.type";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import {productColumns} from "@/app/[locale]/(root)/products/constants";
import {PAGE_SIZE} from "@/shared/enums";

export default function ProductListPage() {
    const t = useTranslations("ProductMessages");
    const {openModal} = useModal();
    const [units, setUnits] = useState<UnitType[]>([]);
    const [productTypes, setProductTypes] = useState<CommonCodeType[]>([]);
    const [products, setProducts] = useState<ListResponseType<ProductType>>({
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

    const {isFetching, data} = useQuery({
        queryKey: ["productUnits"],
        queryFn: async () => await getUnits(),
        select: (data) => get(data, "result.data", []),
        enabled: true,
    })

    const {isFetching: isFetchingProductType, data: productTypeData} = useQuery({
        queryKey: ["productTypes"],
        queryFn: async () => await getProductTypes(),
        select: (data) => get(data, "result.data", []),
        enabled: true,
    })

    const {isFetching: isFetchingProducts, isRefetching, data: productsData, refetch} = useQuery({
        queryKey: ["products"],
        queryFn: async () => await getProducts(pagination),
        enabled: true,
    })

    const table = useMaterialReactTable({
        columns: productColumns,
        data: products.data,
        rowCount: products.meta.itemCount ?? 0,
        pageCount: products.meta.pageCount ?? 0,
        getRowId: (row) => row.productCode,
        muiPaginationProps: {
            color: "primary",
            shape: "rounded",
            showRowsPerPage: false,
            variant: "outlined",
        },
        paginationDisplayMode: "pages",
        manualPagination: true,
        onPaginationChange: setPagination, //hoist pagination state to your state when it changes internally
        state: {pagination}, //pass the pagination state to the table
    });

    const handleAddProduct = () => {
        openModal({
            isOpen: true,
            title: t("addProductModalTitle"),
            description: "",
            modalContent: <ProductForm units={units} productTypes={productTypes}/>,
            customSize: "lg:!min-w-[800px]",
        })
    };

    useEffect(() => {
        if (isFetching || !data?.length) return;
        setUnits(data);
    }, [data, isFetching])

    useEffect(() => {
        if (isFetchingProductType || !productTypeData?.length) return;
        setProductTypes(productTypeData);
    }, [productTypeData, isFetchingProductType])

    useEffect(() => {
        if (isFetchingProducts || isRefetching || productsData?.type === "error") return;
        setProducts(productsData?.result);
    }, [productsData, isRefetching, isFetchingProducts])

    useEffect(() => {
        refetch();
    }, [pagination, refetch])

    return (
        <LayoutContentSection title={t("title")} desc={"ddd"}>
            <div className="flex flex-col gap-4">
                <div className="flex w-full justify-end">
                    <Button onClick={handleAddProduct} size="sm">
                        <IconPlus size={16}/>
                        {t("addProductModalTitle")}
                    </Button>
                </div>
                <MaterialReactTable table={table} />
            </div>
        </LayoutContentSection>
    );
}