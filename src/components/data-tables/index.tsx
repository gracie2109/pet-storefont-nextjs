
"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    FilterFn

} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {DataTablePagination} from "./pagination"
import {DataTableToolbar} from "./toolbar"
import {DataTableFilterableColumn, DataTableSearchableColumn} from "@/types";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    showToolbar: boolean,
    searchableColumns?: DataTableSearchableColumn<TData>[]
    filterableColumns?: DataTableFilterableColumn<TData>[],
    newRowLink?: string,
    deleteRowsAction?: React.MouseEventHandler<HTMLButtonElement>,
    newRowAction?: React.MouseEventHandler<HTMLButtonElement>,
}

export function DataTableRaw<TData, TValue>({
                                                columns,
                                                data,
                                                showToolbar=true,
                                                searchableColumns,
                                                filterableColumns = [],
                                                newRowLink,
                                                deleteRowsAction,
                                                newRowAction,

                                            }: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [sorting, setSorting] = React.useState<SortingState>([])
    const id = React.useId();


    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,

        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        globalFilterFn:"includesString",
    });




    return (
        <div className="space-y-4 w-full">
            {showToolbar &&   <DataTableToolbar table={table}
                                                filterableColumns={filterableColumns}
                                                searchableColumns={searchableColumns}
                                                newRowLink={newRowLink}
                                                deleteRowsAction={deleteRowsAction}
                                                newRowAction={newRowAction}

            />}

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={`${headerGroup.id}.${id}`}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={`${header.id}-${id}`} colSpan={header.colSpan}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody key={`table_body_${id}`}>
                        {table?.getRowModel()?.rows?.length > 0 ? (
                            table.getRowModel().rows.map((row) => (

                                    <TableRow
                                        key={`tableRow_${row.id}+${id}`}
                                        data-state={row.getIsSelected() && "selected"}
                                        data-table-row={`tableRow_${row.id}+${id}`}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={`data_table_cell_${cell.id}/${id}`} data-table-cell={`data_table_cell_${cell.id}/${id}`}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="w-full overflow-hidden flex items-center">
                <DataTablePagination table={table} showRowPerPage={false}/>
                <p></p>
            </div>

        </div>
    )
}