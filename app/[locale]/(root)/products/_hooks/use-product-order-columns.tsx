import { MRT_ColumnDef } from 'material-react-table';
import { formatCurrency, formatNumber } from '@/shared/lib';
import { EditIcon, ClipboardPen, TrashIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useActionsButtonStore } from '@/states/common.state';
import { formatDate } from 'date-fns';
import { OrderStatus, ProductOrderType } from '@/types/order.type';
import {
  LocaleCurrencyConst,
  LocaleCurrencyUnitConst,
} from '@/shared/constants';
import { useLocale } from 'next-intl';
import {
  Locale,
  LocaleCurrency,
  LocaleUnitCurrency,
} from '@/shared/configs/i18n/config';
import { Badge } from '@/components/ui/badge';

type ProductColumnProps = {
  t: any;
};

export default function useProductOrderColumns({ t }: ProductColumnProps) {
  const { setActionType } = useActionsButtonStore();
  const locale = useLocale() as Locale;

  const handleSetOrderStatus = (orderStatus: OrderStatus) => {
    switch (orderStatus) {
      case 'APPROVED':
        return 'primary';
      case 'CANCELLED':
      case 'REJECTED':
        return 'destructive';
      case 'DELIVERED':
        return 'orange';
      default:
        return 'secondary';
    }
  };

  return [
    {
      accessorKey: 'orderCode', //access nested data with dot notation
      header: t('orders.orderCode'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'center',
        },
      },
    },
    {
      accessorKey: 'deliveryAddress', //access nested data with dot notation
      header: t('orders.deliveryAddress'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'left',
        },
      },
      minSize: 400,
      grow: true,
    },
    {
      accessorKey: 'orderDate', //access nested data with dot notation
      header: t('orders.orderDate'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'center',
        },
      },
      accessorFn: (dataRow) =>
        formatDate(new Date(dataRow.orderDate), 'yyyy-MM-dd'),
    },
    {
      accessorKey: 'totalAmount', //access nested data with dot notation
      header: t('orders.totalAmount'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'right',
        },
      },
      accessorFn: (dataRow) => formatNumber(dataRow.totalAmount),
    },
    {
      accessorKey: 'totalPrice', //access nested data with dot notation
      header: t('orders.totalPrice'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'right',
        },
      },
      accessorFn: (dataRow) =>
        formatCurrency(
          dataRow.totalPrice,
          LocaleCurrencyConst[locale] as LocaleCurrency,
          LocaleCurrencyUnitConst[locale] as LocaleUnitCurrency
        ),
    },
    {
      accessorKey: 'discountAmount', //access nested data with dot notation
      header: t('orders.discountAmount'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'right',
        },
      },
      accessorFn: (dataRow) => formatNumber(dataRow.discountAmount),
    },
    {
      accessorKey: 'discountPercent', //access nested data with dot notation
      header: t('orders.discountPercent'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'right',
        },
      },
      accessorFn: (dataRow) => `${dataRow.discountPercent}%`,
    },
    {
      accessorKey: 'orderStatus',
      header: t('orders.orderStatus'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'center',
        },
      },
      accessorFn: (dataRow) => (
        <Badge variant={handleSetOrderStatus(dataRow.orderStatus)}>
          {dataRow.orderStatus}
        </Badge>
      ),
    },
    {
      accessorKey: 'actions',
      header: t('actions'),
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
                <ClipboardPen
                  size={25}
                  onClick={() => setActionType('approve', row)}
                />
              </TooltipTrigger>
              <TooltipContent>
                {t('orders.approveOrderModalTitle')}
              </TooltipContent>
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
  ] as MRT_ColumnDef<ProductOrderType, any>[];
}
