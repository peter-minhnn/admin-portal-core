import {
  MRT_RowData,
  MRT_TableInstance,
  MRT_TableOptions,
} from 'material-react-table';
import { MRT_Localization_KO } from 'material-react-table/locales/ko';
import { MRT_Localization_VI } from 'material-react-table/locales/vi';
import { Locale } from '@/shared/configs/i18n/config';

const MRT_Localization = {
  vi: MRT_Localization_VI,
  ko: MRT_Localization_KO,
};

export const DataTableProps = <TData extends MRT_RowData>(locale: Locale) => {
  return {
    muiPaginationProps: {
      color: 'primary',
      shape: 'circular',
      showRowsPerPage: false,
      variant: 'outlined',
    },
    muiTablePaperProps: {
      sx: {
        border: '1px solid #e0e0e0',
      },
    },
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    paginationDisplayMode: 'pages',
    manualPagination: true,
    editDisplayMode: 'custom', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    enableStickyHeader: true,
    localization: MRT_Localization[locale as keyof typeof MRT_Localization],
    displayColumnDefOptions: {
      enableRowNumbers: true,
    },
    muiTableContainerProps: ({
      table,
    }: {
      table: MRT_TableInstance<TData>;
    }) => ({
      sx: {
        height: table.getState().isFullScreen ? 'auto' : 'calc(100vh - 350px)',
      },
    }),
  } as Omit<MRT_TableOptions<TData>, any>;
};
