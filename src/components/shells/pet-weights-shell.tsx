'use client'

import * as React from "react"
import {ColumnDef} from "@tanstack/react-table";
import {DataTableColumnHeader} from "@/components/data-tables/column-header";
import {DataTableRaw} from "@/components/data-tables";
import {Checkbox} from "@/components/ui/checkbox";
import { buttonVariants} from "@/components/ui/button";
import {PlusCircle} from "lucide-react";
import clsx from "clsx";
import {toast} from "react-hot-toast";
import {assignWeights} from "@/api-requests/pets";

interface Props {
    data: any[],
}

export function PetsWeightsShell(props: Props) {
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
                    return <p>{row.original.name}</p>
                },
            },
            {
                accessorKey: "value",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Value"/>
                ),
                cell: ({row}) => {
                    return <p>{row.original.value}</p>
                },
            },

        ],
        [props.data]
    );

    const handleSubmit = () => {
        toast.promise((assignWeights()),{
            loading: "Assign...",
            error:(err:any) => {
                console.log(err);
                return "Assign weight fail"
            },
            success:(data:any) => {
                console.log(data);
                return "Assign weight success"
            }
        })
    }


    return (

        <React.Fragment>
            {props.data.length == 0 && (
                    <div
                        onClick={handleSubmit}
                        className={clsx("border max-w-20 place-self-end cursor-pointer",
                            buttonVariants({
                                variant: "outline",
                                size: "sm",
                                className: "h-8",
                            })
                        )}
                    >
                        <PlusCircle  className="mr-2 h-4 w-4" aria-hidden="true" />
                        New
                    </div>
            )}
            <DataTableRaw
                columns={columns}
                data={props.data}
                showToolbar={false}
            />
        </React.Fragment>
    )
}