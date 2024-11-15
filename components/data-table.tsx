import {
    MaterialReactTable,
    MRT_RowData,
    MRT_TableInstance,
} from 'material-react-table'

type DataTableProps<TData extends MRT_RowData> = {
    table: MRT_TableInstance<TData>
}
export default function DataTable<TData extends MRT_RowData>({
    table,
}: Readonly<DataTableProps<TData>>) {
    return <MaterialReactTable table={table} />
}
