import type {MRT_ColumnDef} from "material-react-table";
import {ProductType} from "@/types/product.type";
import {formatCurrency, formatNumber} from "@/shared/lib";

export const productColumns: MRT_ColumnDef<ProductType, any>[] = [
    {
        accessorKey: "productCode", //access nested data with dot notation
        header: "Mã sản phẩm",
    },
    {
        accessorKey: "productName",
        header: "Tên sản phẩm",
    },
    {
        accessorKey: "productPrice",
        header: "Giá",
        accessorFn: (dataRow) => formatCurrency(dataRow.productPrice, "vi-VN", "VND"),
    },
    {
        accessorKey: "productMinQty",
        header: "Số lượng tối thiểu",
        accessorFn: (dataRow) => formatNumber(dataRow.productPrice),
    },
    {
        accessorKey: "productMaxQty",
        header: "Số lượng tối đa",
        accessorFn: (dataRow) => formatNumber(dataRow.productPrice),
    },
    {
        accessorKey: "productType",
        header: "Loại sản phẩm",
    },
    {
        accessorKey: "unitCode",
        header: "Đơn vị",
    },
    {
        accessorKey: "productDesc",
        header: "Mô tả",
    },
    {
        accessorKey: "productImage",
        header: "Hình ảnh",
    },
];