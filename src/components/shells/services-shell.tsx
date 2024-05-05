'use client'

import * as React from "react"
import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox";
import {DataTableColumnHeader} from "@/components/data-tables/column-header";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {Edit, PawPrint, Settings, Trash} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {DataTableRaw} from "@/components/data-tables";
import {Button} from "@/components/ui/button";
import {toast} from "react-hot-toast";

import {Icons} from "@/components/icons";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {ScrollArea} from "@/components/ui/scroll-area"
import {Separator} from "@/components/ui/separator"
import {IService} from "@/types/service";
import {IPets} from "@/types/pets";
import {AlertDialogC} from "@/components/alert-dialog-c";
import {deleteService} from "@/api-requests/services";

interface ServicesShellProps {
    data: IService[],
    pets: IPets[],
    status: boolean
}

export function ServicesShell(props: ServicesShellProps) {
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

                        {props?.pets && props?.pets?.length >= 7 ? (
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            aria-label="Open menu"
                                            variant="ghost"
                                            disabled={!row?.original.status}
                                        >
                                            <Settings className="h-4 w-4 text-black mr-2" aria-hidden="true"/>Set Price
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-[160px]">
                                        <ScrollArea className="h-72 w-48 rounded-md border">
                                            <div className="p-4">
                                                <h4 className="mb-4 text-sm font-medium leading-none">Setting price for
                                                    pets</h4>
                                                {props?.pets && props?.pets?.map((i: any, j: any) => {
                                                    //@ts-ignore
                                                    const PetIcons = i?.icon ? Icons[i?.icon] : PawPrint
                                                    return (
                                                        <React.Fragment key={`${i?._id}.pets.${j}.${i?.updatedAt}`}>
                                                            <TooltipProvider
                                                                key={`${i?._id}.pets.${j}.${i?.updatedAt}`}>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Button variant="link" onClick={() => {
                                                                            if (!row?.original.status) {
                                                                                toast.error("Service is blocking")
                                                                            } else {
                                                                                startTransition(() => {
                                                                                    router.push(`${pathname}/pets/${i?._id}/${row.original.id}`)
                                                                                })
                                                                            }
                                                                        }}>
                                                                    <span className="flex items-center gap-2">
                                                                        <PetIcons/>
                                                                        {i?.name}
                                                                    </span>
                                                                        </Button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>Setting
                                                                            service {row?.original?.name} for {i?.name}</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                            <Separator/>
                                                        </React.Fragment>

                                                    )
                                                })}
                                            </div>
                                            <DropdownMenuSeparator/>
                                        </ScrollArea>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </>
                        ) : (
                            <>
                                {props?.pets && props?.pets?.map((i: any, j: any) => {
                                    //@ts-ignore
                                    const PetIcons = i?.icon ? Icons[i?.icon] : PawPrint
                                    return (
                                        <React.Fragment key={`${i?._id}.animal.${j}.${i?.createdAt}`}>
                                            <TooltipProvider key={`${i?._id}.animal.${j}.${i?.createdAt}`}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button variant="link" onClick={() => {
                                                            startTransition(() => {
                                                                router.push(`${pathname}/pets/${i?._id}/${row.original.id}`)
                                                            })
                                                        }}>
                                                    <span className="flex items-center gap-2">
                                                        <PetIcons/>
                                                        {i?.name}
                                                    </span>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Setting service {row?.original?.name} for {i?.name}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </React.Fragment>
                                    )
                                })}

                            </>
                        )}
                    </div>
                ),
            },
        ],
        [props.data, props.status]
    );

    const deleteServiceFnc = () => {
        toast.promise((deleteService(deleteItem?._id)), {
            loading: "Deleting...",
            success: () => {
                setOpenDialog(false);
                setDeleteItem(null);
                return "Service is removed";
            },
            error: (data) => {
                console.log("fail", data);
                return "Service deletion failed";
            },
        });
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
                        title: "service name",
                        id: "name"
                    }
                ]}

            />
            {openDialog && (
                <AlertDialogC
                    open={openDialog}
                    setOpen={setOpenDialog}
                    handleOk={() => void deleteServiceFnc()}
                    title={`Are you absolutely sure delete ${deleteItem?.name}`}
                />
            )}

        </>
    )
}