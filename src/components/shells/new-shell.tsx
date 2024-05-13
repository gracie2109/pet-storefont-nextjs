'use client'

import {INews} from "@/types/news";
import * as React from "react";
import {usePathname} from "next/navigation";
import {useMounted} from "@/hooks/use-mounted";
import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox";
import {DataTableColumnHeader} from "@/components/data-tables/column-header";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Edit, EyeIcon, Trash} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {toast} from "react-hot-toast";
import {deletePost} from "@/api-requests/news";
import {DataTableRaw} from "@/components/data-tables";
import {AlertDialogC} from "@/components/alert-dialog-c";
import {fallbackImage} from "@/lib/contants";
import Image from "next/image";
import {DialogC} from "@/components/dialog-c";

interface Props {
    data: INews[]
}

export function NewShell({data}: Props) {
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [handleItem, setHandleItem] = React.useState<any>(null);
    const pathname = usePathname();
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const mouted = useMounted()

    React.useEffect(() => {
        if (!openModal) reset()
    }, [openModal]);

    const reset = () => {
        setOpenModal(false);
        setHandleItem(null);
        setOpenDialog(false);
        setSelectedRowIds([])
    }

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
                    const images = row.original.images ? row.original.images : fallbackImage;
                    return (
                        <div>
                            <Image
                                alt={row.original.name}
                                src={fallbackImage}
                                width={50}
                                height={50}
                                loading="lazy"
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
                                {row.getValue("name")}
                            </Link>
                        </div>
                    )
                },
            },
            {
                accessorKey: "preview",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Preview"/>
                ),
                cell: ({row}) => {
                    return (
                        <p>{row.original.preview}</p>
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
                    const stt = row.original.status
                    return <div>
                        <Badge variant={stt == true ? "green" : "destructive"}>
                            {stt == true ? "active" : "inactive"}
                        </Badge>
                    </div>
                },
            },
            {
                id: "actions",
                cell: ({row}) => (
                    <div className={"flex items-center gap-3"}>
                        <Link href={`${pathname}/${row.original.id}`}>
                            <Button variant="link" onClick={() => {
                            }}>
                                <Edit className="mr-2 h-4 w-4"/> Edit
                            </Button>
                        </Link>
                        <Button variant="link" onClick={() => {
                            setOpenDialog(true);
                            setHandleItem(row.original)
                        }}>
                            <Trash className="mr-2 h-4 w-4 text-red-600"/>
                        </Button>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="none" size="icon"
                                            onClick={() => {
                                                setOpenModal(true);
                                                setHandleItem(row.original)
                                            }}
                                    >
                                        <EyeIcon className="h-4 w-4"/>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent asChild>
                                    <div>List service of pet</div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                ),
            },
        ],
        [data]
    );
    const deleteNewFnc = () => {
        toast.promise((deletePost(handleItem?._id)), {
            loading: "Deleting...",
            success: () => {
                reset();
                return "Delete post success"
            },
            error: (error) => {
                reset();
                console.log("errr", error)
                return "Delete post fail"
            }
        })
    };
    return (
        <React.Fragment>
            <DataTableRaw
                columns={columns}
                data={data}
                showToolbar={true}
                newRowLink={`${pathname}/create`}
                searchableColumns={[
                    {
                        title: "post title",
                        id: "name"
                    }
                ]}
            />
            {openDialog && (
                <AlertDialogC
                    open={openDialog}
                    setOpen={setOpenDialog}
                    handleOk={() => void deleteNewFnc()}
                    title={`delete role: ${handleItem?.name}`}
                />
            )}
            {openModal && mouted && (
                <DialogC
                    title={handleItem?.name}
                    open={openModal}
                    setOpen={setOpenModal}
                    className="w-[90vw]"
                >
                    <div>
                        <div>
                            <Image
                                alt={handleItem?.name}
                                src={fallbackImage}
                                width={50}
                                height={50}
                                loading="lazy"
                            />
                        </div>
                        <p className="text-sm text-muted-foreground">{handleItem?.preview}</p>
                        <div dangerouslySetInnerHTML={{__html: handleItem?.content}}/>
                    </div>
                </DialogC>
            )}

        </React.Fragment>
    )
}