import type { MRT_ColumnDef } from 'material-react-table'
import { ProductFormData } from '@/types/product.type'
import { formatCurrency, formatNumber } from '@/shared/lib'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

export default function useProductColumns(t: any) {
    return [
        {
            accessorKey: 'productCode', //access nested data with dot notation
            header: t('productCode'),
            muiTableBodyCellProps: {
                sx: {
                    textAlign: 'center',
                },
            },
        },
        {
            accessorKey: 'productImage',
            header: t('productImage'),
            accessorFn: (dataRow) => (
                <Avatar className="w-16 h-16">
                    <AvatarImage
                        src={
                            String(dataRow.productImage) ||
                            '/images/placeholder.png'
                        }
                        alt={String(dataRow.productName) || 'Product Image'}
                        className="size-full rounded-[inherit] object-cover"
                    />
                </Avatar>
            ),
        },
        {
            accessorKey: 'productName',
            header: t('productName'),
            muiTableBodyCellProps: {
                sx: {
                    textAlign: 'left',
                },
            },
        },
        {
            accessorKey: 'productPrice',
            header: t('productPrice'),
            muiTableBodyCellProps: {
                sx: {
                    textAlign: 'right',
                },
            },
            accessorFn: (dataRow) =>
                formatCurrency(dataRow.productPrice, 'vi-VN', 'VND'),
        },
        {
            accessorKey: 'productMinQty',
            header: t('productMinQty'),
            accessorFn: (dataRow) => formatNumber(dataRow.productMinQty),
            muiTableBodyCellProps: {
                sx: {
                    textAlign: 'right',
                },
            },
        },
        {
            accessorKey: 'productMaxQty',
            header: t('productMaxQty'),
            accessorFn: (dataRow) => formatNumber(dataRow.productMaxQty),
            muiTableBodyCellProps: {
                sx: {
                    textAlign: 'right',
                },
            },
        },
        {
            accessorKey: 'productType',
            header: t('productType'),
            muiTableBodyCellProps: {
                sx: {
                    textAlign: 'center',
                },
            },
        },
        {
            accessorKey: 'unitCode',
            header: t('unitCode'),
            muiTableBodyCellProps: {
                sx: {
                    textAlign: 'center',
                },
            },
        },
        {
            accessorKey: 'productDesc',
            header: t('productDesc'),
            grow: true,
            minSize: 400,
        },
    ] as MRT_ColumnDef<ProductFormData, any>[]
}
