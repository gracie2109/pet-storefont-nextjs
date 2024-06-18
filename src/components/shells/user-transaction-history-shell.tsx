'use client'
import * as React from "react";
import {ColumnDef} from "@tanstack/react-table";
import {DataTableColumnHeader} from "@/components/data-tables/column-header";
import {DataTableRaw} from "@/components/data-tables";
import Link from "next/link";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Shell} from "@/components/shell";

export function UserTransactionHistoryShell ({data}:{data:any}) {

    const columns = React.useMemo<ColumnDef<any, unknown>[]>(
        () => [
            {
                accessorKey: "code",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Order Code"/>
                ),
                cell: ({row}) => <Link href={`/profile/transaction/${row.original.id}`}>{row.original.code}</Link>,
            },
            {
                accessorKey: "orderDate",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Date"/>
                ),
                cell: ({row}) => <p>{row.original.orderDate}</p>,
            },
            {
                accessorKey: "paymentStatus",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Payment Status"/>
                ),
                cell: ({row}) => <p>{row.original.paymentStatus}</p>,
            },
            {
                accessorKey: "fulfillmentStatus",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Fulfillment Status"/>
                ),
                cell: ({row}) => <p>{row.original.fulfillmentStatus}</p>,
            },
            {
                accessorKey: "total_price",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Total Price"/>
                ),
                cell: ({row}) => <p>{row.original.total_price}</p>,
            },
        ],
        [data]
    );
    return (
        <Shell variant="sidebar">
            <Card>
                <CardHeader>
                    <CardTitle>Change profile</CardTitle>
                    <CardDescription>Click on your avatar to change</CardDescription>
                </CardHeader>


                <CardContent>
            <DataTableRaw
                columns={columns}
                data={data}
                showToolbar={true}
                searchableColumns={[]}
            />
                </CardContent>
            </Card>
        </Shell>
    )
}