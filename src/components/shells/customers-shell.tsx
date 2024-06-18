'use client';

import * as React from "react";
import {usePathname} from "next/navigation";
import {useMounted} from "@/hooks/use-mounted";
import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox";
import {DataTableColumnHeader} from "@/components/data-tables/column-header";
import {fallbackImage} from "@/lib/contants";
import Image from "next/image";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Edit, EyeIcon, Trash} from "lucide-react";
import {ICustomers} from "@/types/customers";
import {DataTableRaw} from "@/components/data-tables";

interface Props{
    data:ICustomers[]
}

export function CustomersShell ({data}:Props) {
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([]);
    const pathname = usePathname();
    const mouted = useMounted();



    const columns = React.useMemo<ColumnDef<any, unknown>[]>(
        () => [
            {
                id: "select",
                header: ({table}) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => {
                            table.toggleAllPageRowsSelected(!!value);

                            setSelectedRowIds((prev) =>
                                // @ts-ignore
                                prev.length === props?.data?.length ? [] : props?.data?.map((row) => Number(row.id))
                            )
                        }}
                        aria-label="Select all"
                        className="translate-y-[2px]"
                    />
                ),
                cell: ({row}) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => {
                            row.toggleSelected(!!value)
                            setSelectedRowIds((prev) =>
                                value
                                    ? [...prev, row.original.id]
                                    : prev.filter((id) => id !== row.original.id)
                            )
                        }}
                        aria-label="Select row"
                        className="translate-y-[2px]"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },

            {
                accessorKey: "images",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Cover"/>
                ),
                cell: ({row}) => {
                    const images = row.original.images[0];
                    return (
                        <div className="lowercase truncate ">
                            <Image
                                src={images?.url ? images?.url  : fallbackImage}
                                alt={row.original.name}
                                width={40}
                                height={40}
                            />
                        </div>
                    )
                },
            },
            {
                accessorKey: "username",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Name"/>
                ),
                cell: ({row}) => {
                    const id = row.original.id as string;
                    return (
                        <div className="lowercase truncate ">
                            <Link href={`${pathname}/${id}`}>
                                {row.getValue("username")}
                            </Link>
                        </div>
                    )
                },
            },
            {
                accessorKey: "email",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Name"/>
                ),
                cell: ({row}) => {
                    const id = row.original.id as string;
                    return (
                        <div className="lowercase truncate ">
                            <Link href={`${pathname}/${id}`}>
                                {row.getValue("email")}
                            </Link>
                        </div>
                    )
                },
            },
            {
                accessorKey: "status",
                header: ({column}) => {
                    return (
                        <DataTableColumnHeader column={column} title="status"/>
                    )
                },
                cell: ({row}) => {
                    const stt = row.getValue("status")
                    return <div>
                        <Badge variant={stt == "Active" ? "green" : "destructive"}>
                            {stt == "Active" ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                },
            },
            {
                accessorKey: "isVerified",
                header: ({column}) => {
                    return (
                        <DataTableColumnHeader column={column} title="Verify"/>
                    )
                },
                cell: ({row}) => {
                    const stt = row.getValue("isVerified")
                    return <div>
                        <Badge variant={stt ? "green" : "destructive"}>
                            {stt  ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                },
            },
            {
                id: "actions",
                cell: ({row}) => (
                    <div className={"flex items-center gap-3"}>
                        <Button variant="link" onClick={() => {

                        }}>
                            <Edit className="mr-2 h-4 w-4"/> Edit
                        </Button>
                        <Button variant="link" onClick={() => {

                        }}>
                            <Trash className="mr-2 h-4 w-4 text-red-600"/>
                        </Button>


                    </div>
                ),
            },
        ],
        [data]
    );



    return (
        <>
            <DataTableRaw
                columns={columns}
                data={data}
                showToolbar={true}
                newRowLink={`${pathname}/create`}
                searchableColumns={[
                    {
                        title: "customers name",
                        id: "username"
                    }
                ]}
            />

        </>
    )
}