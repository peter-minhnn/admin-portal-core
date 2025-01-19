import { MRT_ColumnDef } from 'material-react-table';
import { formatCurrency } from '@/shared/lib';
import { EditIcon, ClipboardPen } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useActionsButtonStore } from '@/states/common.state';
import { formatDate } from 'date-fns';
import { OrderStatus, ProductOrderType } from '@/types/order.type';
import { Badge } from '@/components/ui/badge';

type ProductColumnProps = {
  t: any;
};

export default function useProductOrderColumns({ t }: ProductColumnProps) {
  const { setActionType } = useActionsButtonStore();

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
      accessorKey: 'totalPrice', //access nested data with dot notation
      header: t('orders.totalPrice'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'right',
        },
      },
      accessorFn: (dataRow) => formatCurrency(dataRow.totalPrice),
    },
    {
      accessorKey: 'customerName', //access nested data with dot notation
      header: t('orders.customerName'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'left',
        },
      },
      minSize: 300,
      grow: true,
    },
    {
      accessorKey: 'contactName', //access nested data with dot notation
      header: t('orders.contactName'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'left',
        },
      },
      minSize: 300,
      grow: true,
    },
    {
      accessorKey: 'contactNumber', //access nested data with dot notation
      header: t('orders.contactNumber'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'center',
        },
      },
      minSize: 150,
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
          </TooltipProvider>
        </div>
      ),
    },
  ] as MRT_ColumnDef<ProductOrderType, any>[];
}
