import { MRT_ColumnDef } from 'material-react-table';
import { ProductFormData } from '@/types/product.type';
import { formatCurrency, formatNumber } from '@/shared/lib';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { EditIcon, TrashIcon } from 'lucide-react';
import { IconCoin } from '@tabler/icons-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Dispatch, SetStateAction } from 'react';

type ProductColumnProps = {
  t: any;
  setActionType: Dispatch<
    SetStateAction<{
      type: 'edit' | 'delete' | 'updatePrice' | '';
      row: ProductFormData;
    }>
  >;
};

export default function useProductColumns({
  t,
  setActionType,
}: ProductColumnProps) {
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
        <div className="w-full flex justify-center">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={String(dataRow.productImage) || '/images/placeholder.png'}
              alt={String(dataRow.productName) || 'Product Image'}
              className="size-full rounded-[inherit] object-cover"
            />
          </Avatar>
        </div>
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
    {
      accessorKey: 'actions',
      header: t('actions'),
      maxSize: 80,
      size: 80,
      accessorFn: (row) => (
        <div className="flex flex-row justify-center items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <EditIcon
                  size={25}
                  onClick={() => setActionType({ type: 'edit', row })}
                />
              </TooltipTrigger>
              <TooltipContent>{t('editProductModalTitle')}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <IconCoin
                  size={25}
                  onClick={() => setActionType({ type: 'updatePrice', row })}
                />
              </TooltipTrigger>
              <TooltipContent>{t('updateProductPrice')}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <TrashIcon
                  size={25}
                  onClick={() => setActionType({ type: 'delete', row })}
                />
              </TooltipTrigger>
              <TooltipContent>{t('deleteProductModalTitle')}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
  ] as MRT_ColumnDef<ProductFormData, any>[];
}
