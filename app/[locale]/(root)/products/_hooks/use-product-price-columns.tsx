import { MRT_ColumnDef } from 'material-react-table';
import { ProductPriceType } from '@/types/product.type';
import { formatCurrency } from '@/shared/lib';
import { EditIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useActionsButtonStore } from '@/states/common.state';

type ProductPriceColumnProps = {
  t: any;
};

export default function useProductPriceColumns({ t }: ProductPriceColumnProps) {
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
      accessorKey: 'price',
      header: t('price'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'left',
        },
      },
      accessorFn: (dataRow) => formatCurrency(dataRow.price, 'vi-VN', 'VND'),
    },
    {
      accessorKey: 'originalPrice',
      header: t('originalPrice'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'right',
        },
      },
      accessorFn: (dataRow) =>
        formatCurrency(dataRow.originalPrice, 'vi-VN', 'VND'),
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
      accessorKey: 'isActive',
      header: t('isActive'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'center',
        },
      },
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
          </TooltipProvider>
        </div>
      ),
    },
  ] as MRT_ColumnDef<ProductPriceType, any>[];
}
