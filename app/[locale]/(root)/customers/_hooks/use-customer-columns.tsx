import { MRT_ColumnDef } from 'material-react-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EditIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useActionsButtonStore } from '@/states/common.state';
import { CustomerType } from '@/types/customer.type';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/shared/lib';
import { Gender } from '@/shared/enums';

type CustomerColumnProps = {
  t: any;
};

export default function useCustomerColumns({ t }: CustomerColumnProps) {
  const { setActionType } = useActionsButtonStore();

  const handleSetGenderType = (gender: number) => {
    if (gender === Gender.MALE) return t('male');
    if (gender === Gender.FEMALE) return t('female');
    return t('other');
  };

  return [
    {
      accessorKey: 'avatar',
      header: t('avatar'),
      accessorFn: (dataRow) => (
        <div className="w-full flex justify-center">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={dataRow.avatar || '/images/placeholder.png'}
              srcSet={dataRow.avatar || '/images/placeholder.png'}
              alt={dataRow.avatar || dataRow.firstName}
              className="size-full rounded-[inherit] object-cover"
            />
            <AvatarFallback>
              <AvatarImage
                src={'/images/placeholder.png'}
                alt={String(dataRow.avatar) || 'Product Image'}
                className="size-full rounded-[inherit] object-cover"
              />
            </AvatarFallback>
          </Avatar>
        </div>
      ),
    },
    {
      accessorKey: 'email', //access nested data with dot notation
      header: t('email'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'center',
        },
      },
    },
    {
      accessorKey: 'firstName',
      header: t('firstName'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'center',
        },
      },
    },
    {
      accessorKey: 'lastName',
      header: t('lastName'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'center',
        },
      },
    },
    {
      accessorKey: 'phoneNumber',
      header: t('phoneNumber'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'right',
        },
      },
    },
    {
      accessorKey: 'gender',
      header: t('gender'),
      accessorFn: (dataRow) => handleSetGenderType(dataRow.gender),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'center',
        },
      },
    },
    {
      accessorKey: 'birthDate',
      header: t('birthDate'),
      accessorFn: () => {
        return null;
      },
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'center',
        },
      },
    },
    {
      accessorKey: 'address',
      header: t('address'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'left',
        },
      },
      minSize: 350,
      grow: true,
    },
    {
      accessorKey: 'isActive',
      header: t('status'),
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
              <TooltipContent>{t('editCustomerModalTitle')}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
  ] as MRT_ColumnDef<CustomerType, any>[];
}
