'use client'

import * as React from "react"
import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox";
import {DataTableColumnHeader} from "@/components/data-tables/column-header";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {Edit, EyeIcon, Trash} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {DataTableRaw} from "@/components/data-tables";
import {Button} from "@/components/ui/button";
import {AlertDialogC} from "@/components/alert-dialog-c";
import {fallbackImage} from "@/lib/contants";
import {DialogC} from "@/components/dialog-c";
import {useMounted} from "@/hooks/use-mounted";
import {deletePost} from "@/api-requests/news";
import toast from "react-hot-toast";
import {truncate} from "@/lib/utils";
import {INews} from "@/types/news";
import Image from "next/image";
interface ServicesShellProps {
    data: INews[],
}

export function NewsShell(props: ServicesShellProps) {
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])
    const [pending, startTransition] = React.useTransition();
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [deleteItem, setDeleteItem] = React.useState<INews | null>(null);
    const pathname = usePathname();
    const router = useRouter();
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const mounted = useMounted();

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
                accessorKey: "name",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Name"/>
                ),
                cell: ({row}) => {
                    const id = row.original.id as string;
                    return (
                        <div className="lowercase truncate ">
                            <Link href={`${pathname}/${id}`}>
                                {truncate(row.getValue("name"), 30)}
                            </Link>
                        </div>
                    )
                },
            },
            {
                accessorKey: "preview",
                header: ({column}) => (
                    // <DataTableColumnHeader column={column} title="Preview" />
                    <p>Preview</p>
                ),
                cell: ({row}) => {
                    return (
                        <div>
                            {truncate(row.original.preview, 50)}
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
                        <Button variant="link" onClick={() => {
                            setOpenModal(true);
                            setDeleteItem(row.original)
                        }}>
                            <EyeIcon className="mr-2 h-4 w-4 text-red-600"/>
                        </Button>

                    </div>
                ),
            },
        ],
        [props.data]
    );

    const deleteRoleFnc = () => {
        if (deleteItem) {
            toast.promise((deletePost(deleteItem?._id)), {
                loading: "Deleting...",
                success: () => {
                    setOpenDialog(false);
                    setDeleteItem(null);
                    return "POST is removed";
                },
                error: (data) => {
                    console.log("fail", data);
                    return "POST deletion failed";
                },
            });
        }
    };

    const reset = () => {
        setOpenDialog(false);
        setOpenModal(false);
        setDeleteItem(null);
        setSelectedRowIds([])
    }


    return (
        <React.Fragment>
            <DataTableRaw
                columns={columns}
                data={props.data}
                showToolbar={true}
                newRowLink={`${pathname}/create`}
                searchableColumns={[
                    {
                        title: "post name",
                        id: "name"
                    }
                ]}
            />
            {openDialog && (
                <AlertDialogC
                    open={openDialog}
                    setOpen={setOpenDialog}
                    handleOk={() => void deleteRoleFnc()}
                    title={`delete role: ${deleteItem?.name}`}
                />
            )}
            {openModal && mounted && deleteItem && (
                <DialogC
                    title={deleteItem?.name}
                    open={openModal}
                    setOpen={setOpenModal}
                    className="max-w-screen-md p-12 h-full max-h-screen overflow-y-auto"
                >
                    <div className="relative container max-w-screen-sm">
                        <div dangerouslySetInnerHTML={{__html: deleteItem?.content}}/>
                    </div>
                </DialogC>
            )}
        </React.Fragment>
    )
}