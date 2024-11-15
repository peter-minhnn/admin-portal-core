import { MRT_RowData, MRT_TableOptions } from 'material-react-table'

export const DataTableProps = <TData extends MRT_RowData>(t: any) => {
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
        localization: {
            actions: t('actions'),
            search: t('searchPlaceholder'),
            noResultsFound: t('searchNoData'),
            noRecordsToDisplay: t('searchNoData'),
            filterByColumn: t('filterByColumn'),
            hideAll: t('hideAll'),
            hideColumn: t('hideColumn'),
            showAll: t('showAll'),
            sortByColumnAsc: t('sortByColumnAsc'),
            sortByColumnDesc: t('sortByColumnDesc'),
            clearSort: t('clearSort'),
            showAllColumns: t('showAllColumns'),
            clearFilter: t('clearFilters'),
            clearSearch: t('clearSearch'),
            showHideColumns: t('showHideColumns'),
            showHideFilters: t('showHideFilters'),
            showHideSearch: t('showHideSearch'),
            sortedByColumnAsc: t('sortByColumnAsc'),
            sortedByColumnDesc: t('sortByColumnDesc'),
            columnActions: t('columnActions'),
            toggleDensity: t('toggleDensity'),
            toggleFullScreen: t('toggleFullScreen'),
            toggleVisibility: t('toggleVisibility'),
            rowActions: t('rowActions'),
            pin: t('pin'),
        },
        displayColumnDefOptions: {
            enableRowNumbers: true,
        },
    } as Omit<MRT_TableOptions<TData>, any>
}
