import type { MRT_ColumnDef } from "material-react-table";
import { ProductFormData } from "@/types/product.type";
import { formatCurrency, formatNumber } from "@/shared/lib";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function useProductColumns(t: any) {
  return [
    {
      accessorKey: "productCode", //access nested data with dot notation
      header: t("productCode"),
    },
    {
      accessorKey: "productImage",
      header: t("productImage"),
      accessorFn: (dataRow) => (
        <Avatar className="w-16 h-16">
          <AvatarImage
            src={dataRow.productImage || "/images/placeholder.png"}
            alt={dataRow.productName || "Product Image"}
            className="size-full rounded-[inherit] object-cover"
          />
        </Avatar>
      ),
    },
    {
      accessorKey: "productName",
      header: t("productName"),
    },
    {
      accessorKey: "productPrice",
      header: t("productPrice"),
      accessorFn: (dataRow) =>
        formatCurrency(dataRow.productPrice, "vi-VN", "VND"),
    },
    {
      accessorKey: "productMinQty",
      header: t("productMinQty"),
      accessorFn: (dataRow) => formatNumber(dataRow.productMinQty),
    },
    {
      accessorKey: "productMaxQty",
      header: t("productMaxQty"),
      accessorFn: (dataRow) => formatNumber(dataRow.productMaxQty),
    },
    {
      accessorKey: "productType",
      header: t("productType"),
    },
    {
      accessorKey: "unitCode",
      header: t("unitCode"),
    },
    {
      accessorKey: "productDesc",
      header: t("productDesc"),
    },
  ] as MRT_ColumnDef<ProductFormData, any>[];
}
