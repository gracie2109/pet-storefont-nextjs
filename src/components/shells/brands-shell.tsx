'use client'

import * as React from "react"
import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox";
import {DataTableColumnHeader} from "@/components/data-tables/column-header";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {Edit, Trash} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {DataTableRaw} from "@/components/data-tables";
import {Button} from "@/components/ui/button";
import {toast} from "react-hot-toast";
import {AlertDialogC} from "@/components/alert-dialog-c";
import {IBrands} from "@/types/brands";
import Image from "next/image";
import {fallbackImage} from "@/lib/contants";

interface BrandsShellProps {
    data: IBrands[],
}

export function BrandsShell(props: BrandsShellProps) {
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])
    const [pending, startTransition] = React.useTransition();
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [deleteItem, setDeleteItem] = React.useState<any>(null);
    const pathname = usePathname();
    const router = useRouter();


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
                    <DataTableColumnHeader column={column} title="Images"/>
                ),
                cell: ({row}) => {

                    return (

                          <Image src={row.original.images ?? fallbackImage} alt={row.original.name}
                                 width={50} height={50}
                          />
                    )
                },
            },

            {
                accessorKey: "name",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Name"/>
                ),
                cell: ({row}) => {
                    const id = row.original.id as string;
                    return (
                        <div className="lowercase truncate ">
                            <Link href={`${pathname}/${id}`}>
                                {row.getValue("name")}
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
                        <Badge variant={stt == true ? "green" : "destructive"}>
                            {stt == true ? "active" : "unactive"}
                        </Badge>
                    </div>
                },
            },
            {
                id: "actions",
                cell: ({row}) => (
                    <div className={"flex items-center gap-3"}>
                        <Button variant="link" onClick={() => {
                            startTransition(() => {
                                router.push(`${pathname}/${row.original.id}`)
                            })
                        }}>
                            <Edit className="mr-2 h-4 w-4"/> Edit
                        </Button>
                        <Button variant="link" onClick={() => {
                            setOpenDialog(true);
                            setDeleteItem(row.original)
                        }}>
                            <Trash className="mr-2 h-4 w-4 text-red-600"/>
                        </Button>


                    </div>
                ),
            },
        ],
        [props.data]
    );

    const deleteRoleFnc = () => {
        console.log("Delete Role Fnc",deleteItem?._id);
    };
    return (

        <>


            <DataTableRaw
                columns={columns}
                data={props.data}
                showToolbar={true}
                newRowLink={`${pathname}/create`}
                searchableColumns={[
                    {
                        title: "brand name",
                        id: "name"
                    }
                ]}

            />
            {openDialog && (
                <AlertDialogC
                    open={openDialog}
                    setOpen={setOpenDialog}
                    handleOk={() => void deleteRoleFnc()}
                    title={`delete brand: ${deleteItem?.name}`}
                />
            )}

        </>
    )
}