 'use client';

 import React, { Fragment } from 'react';
import {Input} from "@/components/ui/input";
 import {
     Select,
     SelectContent,
     SelectGroup,
     SelectItem,
     SelectLabel,
     SelectTrigger,
     SelectValue,
 } from "@/components/ui/select"
 import {clsx} from "clsx";
 import {useMounted} from "@/hooks/use-mounted";
 import {Table, TableBody,TableHeader, TableHead, TableRow,TableCell, TableCaption, TableFooter} from "@/components/ui/table";
 import {SelectOptions} from "@/types";
 import {UseFormReturn} from "react-hook-form";
import {
    Form,FormControl,FormField,FormItem,FormLabel,FormMessage
} from "@/components/ui/form"
 import MultipleSelector from "@/components/multiple-selector";


 type Props =  {
     data: {
         name: string,
         value: SelectOptions[]
     }[],
     form: UseFormReturn<any>,
     products: any
 }

export function CollapsibleTable ({data,form, products}: Props) {
    const [group, setGroup] = React.useState<string>(data[0]['name']);
    const [collapse, setCollapse] = React.useState<string[]>([])

    const currentIndex = React.useMemo(() => {
        if(!group) return 0;
        else return +data.findIndex((i) => i.name === group)
    },[group])

    const mounted = useMounted()

    const optionData = React.useMemo(() => {
        if(data.length === 1) return null;
        const otherOption = data.filter((_, j) => j !== currentIndex)

        if(otherOption.length === 1) return otherOption[0].value;
        else return otherOption[0].value.flatMap((i) => otherOption[1].value.map((j) => `${i.value}/${j.value}`))
    },[currentIndex])

    if (mounted) return (
        <div className="space-y-3">
            <div>
                :::: {JSON.stringify(products, undefined, 2)}
            </div>
            <div className={clsx({
                "hidden" : data.length <=1
            })}>
                <Select  onValueChange={(e) => {
                    setGroup(e);
                    setCollapse([])
                }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={group ?? data[currentIndex]?.name} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {data.map((i, j) => (
                                <SelectItem key={j} value={i.name}>{i.name}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
         
                            <Table className="w-full  table-auto">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>#</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Quantity</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data[currentIndex]?.value.map((i, j) => (
                                        <React.Fragment key={j}>
                                            <TableRow key={j}>
                                                <TableCell onClick={(e) => {
                                                    if (!collapse.includes(i.value))   setCollapse([...collapse, i.value])
                                                    else setCollapse((prev) => prev?.filter((j) => j !== i.value))
                                                }}>
                                                    <span className={clsx(  'font-bold', {
                                                        "cursor-pointer": data.length !== 1
                                                    })}>{i.value}</span>

                                                </TableCell>
                                                <TableCell><Input placeholder="0.00" /></TableCell>
                                                <TableCell><Input placeholder="0"  readOnly={data.length !==1} disabled={data.length !==1} /></TableCell>
                                            </TableRow>
                                            {optionData && optionData.map((option:any, optionIndex:any) => (
                                                <TableRow key={optionIndex} className={clsx({
                                                    'hidden': !collapse.includes(i.value),
                                                    '': collapse.includes(i.value)
                                                })}>
                                                    <TableCell>{option}</TableCell>
                                                    <TableCell><Input placeholder="0.00" /></TableCell>
                                                    <TableCell><Input placeholder="0" /></TableCell>
                                                </TableRow>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </TableBody>
                            </Table>
                       
                
        </div>
    )
}