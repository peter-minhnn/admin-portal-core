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
import { Badge } from '@/components/ui/badge';
import { useLocale } from 'next-intl';
import {
  LocaleCurrencyConst,
  LocaleCurrencyUnitConst,
} from '@/shared/constants';
import {
  Locale,
  LocaleCurrency,
  LocaleUnitCurrency,
} from '@/shared/configs/i18n/config';
import { useModal } from '@/hooks/use-modal';
import ProductPriceHistory from '@/app/[locale]/(root)/products/prices/_components/product-price-history';
import { Button } from '@/components/ui/button';

type ProductPriceColumnProps = {
  t: any;
};

export default function useProductPriceColumns({ t }: ProductPriceColumnProps) {
  const { setActionType } = useActionsButtonStore();
  const { openModal } = useModal();
  const locale = useLocale() as Locale;

  const handleOpenPriceHistory = (productCode: string, unitCode: string) => {
    openModal({
      isOpen: true,
      title: t('productPriceHistory'),
      description: `${t('productCode')}: ${productCode} - ${t('unitCode')}: ${unitCode}`,
      modalContent: (
        <ProductPriceHistory productCode={productCode} unitCode={unitCode} />
      ),
      customSize: '!h-screen lg:!max-w-[800px] overflow-hidden',
    });
  };

  return [
    {
      accessorKey: 'productCode', //access nested data with dot notation
      header: t('productCode'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'center',
        },
      },
      accessorFn: (dataRow) => {
        return (
          <Button
            className="underline text-blue-500 text-md font-semibold cursor-pointer bg-transparent hover:bg-transparent"
            onClick={() =>
              handleOpenPriceHistory(dataRow.productCode, dataRow.unitCode)
            }
          >
            {dataRow.productCode}
          </Button>
        );
      },
    },
    {
      accessorKey: 'price',
      header: t('priceSell'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'right',
        },
      },
      accessorFn: (dataRow) =>
        formatCurrency(
          dataRow.price,
          LocaleCurrencyConst[locale] as LocaleCurrency,
          LocaleCurrencyUnitConst[locale] as LocaleUnitCurrency
        ),
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
        formatCurrency(
          dataRow.originalPrice,
          LocaleCurrencyConst[locale] as LocaleCurrency,
          LocaleCurrencyUnitConst[locale] as LocaleUnitCurrency
        ),
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
      accessorKey: 'description',
      header: t('productDesc'),
      grow: true,
      minSize: 400,
    },
    {
      accessorKey: 'isActive',
      header: t('isActive'),
      muiTableBodyCellProps: {
        sx: {
          textAlign: 'center',
        },
      },
      accessorFn: (dataRow) => (
        <Badge variant={dataRow.isActive ? 'primary' : 'destructive'}>
          {dataRow.isActive ? t('using') : t('notUsing')}
        </Badge>
      ),
    },
    {
      accessorKey: 'actions',
      header: t('actions'),
      muiTableBodyCellProps: {
        sx: {
          width: '60px',
        },
      },
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
