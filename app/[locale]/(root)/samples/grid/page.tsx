"use client";

import {useState} from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    paginationGridCodes,
} from "@/shared/data/samples.data";
import SyntaxHighlighter from "@/components/ui/syntax-highlighter";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import {columns, data} from "@/shared/data/grid-mock.data";
import {PaginationState} from "@/types/common.type";
import {Label} from "@/components/ui/label";

export default function ExampleGridPage() {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });

    const table = useMaterialReactTable({
        columns: columns,
        data: data,
        muiPaginationProps: {
            color: 'primary',
            shape: 'rounded',
            showRowsPerPage: false,
            variant: 'outlined',
        },
        muiTablePaperProps: {
            sx: {
                //stripe the rows, make odd rows a darker color
                borderRadius: "7px",
                border: "1px solid var(--custom-1)",
            },
        },
        paginationDisplayMode: 'pages',
        onPaginationChange: setPagination, //hoist pagination state to your state when it changes internally
        state: { pagination }, //pass the pagination state to the table
    });

    return (
        <>
            <h2 className="text-lg font-bold md:text-xl">SAMPLE GRID</h2>
            <div className="flex flex-col gap-12 lg:flex-row">
                <div className="flex-1">
                    <Tabs defaultValue="preview">
                        <TabsList>
                            <TabsTrigger value="preview">Preview</TabsTrigger>
                            <TabsTrigger value="code">Code</TabsTrigger>
                        </TabsList>
                        <TabsContent value="preview">
                            <div className="flex flex-col h-auto rounded border gap-4 p-4">
                                <Label htmlFor="grid-example-1">Pagination Grid</Label>
                                <MaterialReactTable table={table} />
                            </div>
                        </TabsContent>
                        <TabsContent value="code">
                            <SyntaxHighlighter content={paginationGridCodes} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
}