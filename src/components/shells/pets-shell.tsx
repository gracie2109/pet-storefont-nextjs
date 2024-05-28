'use client'

import * as React from "react"
import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox";
import {DataTableColumnHeader} from "@/components/data-tables/column-header";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {Edit, PawPrint, Settings, TableIcon, Trash} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {DataTableRaw} from "@/components/data-tables";
import {Button} from "@/components/ui/button";
import {toast} from "react-hot-toast";
import {AlertDialogC} from "@/components/alert-dialog-c";
import {DialogC} from "@/components/dialog-c";
import {PetForm} from "@/components/forms/pet-form";
import {useForm} from "react-hook-form";
import {setValuesOfForm} from "@/lib/helpers";
import {initValue, petEditInfer, petEditSchema, petInfer, petSchema} from "@/validations/pets";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMounted} from "@/hooks/use-mounted";
import {createNewPet, deletePet, updatePet} from "@/api-requests/pets";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

interface Props {
    data: any[],
}

export function PetsShell(props: Props) {
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])
    const [pending, startTransition] = React.useTransition();
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [handleItem, setHandleItem] = React.useState<any | null>(null);
    const pathname = usePathname();
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const router = useRouter();
    const [mode, setMode] = React.useState<string | null>(null)
    const mouted = useMounted()

    console.log("mode", mode)
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
                            setHandleItem(row.original);
                            setOpenModal(true);
                            setMode("edit")
                        }}>
                            <Edit className="mr-2 h-4 w-4"/> Edit
                        </Button>
                        <Button variant="link" onClick={() => {
                            setOpenDialog(true);
                            setHandleItem(row.original)
                        }}>
                            <Trash className="mr-2 h-4 w-4 text-red-600"/>
                        </Button>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon"
                                            onClick={() => router.push(`${pathname}/${row.original.id}`)}>
                                        <TableIcon className="h-4 w-4"/>
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
        [props.data]
    );

    const deleteRoleFnc = () => {
        toast.promise((deletePet(handleItem?._id)), {
            loading: "Deleting...",
            success: () => {
                setOpenDialog(false);
                setHandleItem(null);
                return "Pet is removed";
            },
            error: (data) => {
                console.log("fail", data);
                return "Pet deletion failed";
            },
        });
    };
    const form = useForm<petInfer | petEditInfer>({
        mode: "all",
        defaultValues: (!mode || mode === "create") ? initValue : handleItem,
        resolver: zodResolver((!mode || mode === "create") ? petSchema : petEditSchema),
    });

    const handleSubmit = (value: any) => {
        if (mode == "create") {
            toast.promise((createNewPet(value)), {
                loading: "Creating...",
                error: (res: any) => {
                    console.log("res", res);
                    const mess = res?.error ? res?.error : "Creating fail"
                    return mess
                },
                success: (res: any) => {

                    form.reset();
                    setOpenModal(false);
                    return "Creating success"
                },
            })
        } else {
            toast.promise((updatePet({...value, _id: handleItem._id})), {
                loading: "Updating...",
                error: (res: any) => {
                    console.log("res", res);
                    return "Update fail"
                },
                success: (res: any) => {
                    console.log("res", res);
                    form.reset();
                    setOpenModal(false);
                    return "Update success"
                },
            })
        }
    }
    React.useEffect(() => {
        if (!openModal) {
            form.reset();
            setOpenModal(false);
            setHandleItem(null);
            setMode(null)
        }
    }, [openModal]);

    React.useEffect(() => {
        if (mode === "edit" && handleItem ) {
            setValuesOfForm(handleItem, form)
        }
    }, [handleItem, mode]);


    

    return (
        <React.Fragment>
            <DataTableRaw
                columns={columns}
                data={props.data}
                showToolbar={true}
                newRowAction={() => {
                    setOpenModal(true);
                    setMode("create")
                }}
                searchableColumns={[
                    {
                        title: "pet name",
                        id: "name"
                    }
                ]}
            />
            {openDialog && (
                <AlertDialogC
                    open={openDialog}
                    setOpen={setOpenDialog}
                    handleOk={() => void deleteRoleFnc()}
                    title={`delete role: ${handleItem?.name}`}
                />
            )}
            {openModal && mouted && (
                <DialogC
                    title={mode == "create" ? "Create New Pet" : "Edit Pet"}
                    open={openModal}
                    setOpen={setOpenModal}
                    className="w-[90vw]"
                >
                    <PetForm
                        form={form}
                        loading={false}
                        mode={mode}
                        submitHandler={handleSubmit}
                    />
                </DialogC>
            )}
        </React.Fragment>
    )
}