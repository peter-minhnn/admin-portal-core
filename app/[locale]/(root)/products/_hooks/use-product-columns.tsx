import { MRT_ColumnDef } from 'material-react-table';
import { ProductFormData } from '@/types/product.type';
import { cn, formatCurrency, formatNumber } from '@/shared/lib';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EditIcon, TrashIcon } from 'lucide-react';
import { IconCoin } from '@tabler/icons-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useActionsButtonStore } from '@/states/common.state';
import { Switch } from '@/components/ui/switch';

type ProductColumnProps = {
  t: any;
};

export default function useProductColumns({ t }: ProductColumnProps) {
  const { setActionType } = useActionsButtonStore();

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
              src={dataRow.productImage ?? '/images/placeholder.png'}
              srcSet={dataRow.productImage ?? '/images/placeholder.png'}
              alt={dataRow.productImage ?? 'Product Image'}
              className="size-full rounded-[inherit] object-cover"
            />
            <AvatarFallback>
              <AvatarImage
                src={'/images/placeholder.png'}
                alt={dataRow.productName || 'Product Image'}
                className="size-full rounded-[inherit] object-cover"
              />
            </AvatarFallback>
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
      accessorKey: 'pricing.originalPrice',
      header: t('originalPrice'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'right',
        },
      },
      accessorFn: (dataRow) =>
        formatCurrency(Number(dataRow.pricing?.originalPrice ?? 0)),
    },
    {
      accessorKey: 'pricing.price',
      header: t('priceSell'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'right',
        },
      },
      accessorFn: (dataRow) =>
        formatCurrency(Number(dataRow.pricing?.price ?? 0)),
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
      accessorKey: 'isActive',
      header: t('productStatus'),
      minSize: 120,
      accessorFn: (dataRow) => (
        <Switch
          className={cn({
            '!bg-green-500 hover:bg-green-600': dataRow.isActive,
          })}
          checked={dataRow.isActive}
          onCheckedChange={(checked) =>
            setActionType('update-status', { ...dataRow, isActive: checked })
          }
        />
      ),
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
                  onClick={() => setActionType('edit', row)}
                />
              </TooltipTrigger>
              <TooltipContent>{t('editProductModalTitle')}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <IconCoin
                  size={25}
                  onClick={() => setActionType('updatePrice', row)}
                />
              </TooltipTrigger>
              <TooltipContent>{t('updateProductPrice')}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <TrashIcon
                  size={25}
                  onClick={() => setActionType('delete', row)}
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
