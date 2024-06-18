'use client';

import React from 'react';
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {clsx} from "clsx";
import {useMounted} from "@/hooks/use-mounted";
import {
    Table,
    TableBody,
    TableHeader,
    TableHead,
    TableRow,
    TableCell
} from "@/components/ui/table";
import {SelectOptions} from "@/types";
import {useFieldArray, UseFormReturn} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form"


type Props = {
    data: {
        name: string,
        value: SelectOptions[]
    }[],
    form: UseFormReturn<any>
}

export function CollapsibleTable({form, data}: Props) {
    const [group, setGroup] = React.useState<string>(data[0]['name']);
    const [collapse, setCollapse] = React.useState<string[]>([]);
    // const [optionData, setOptionData] = React.useState<any | null>(null);
    // const [currentIndex, setCurrentIndex] = React.useState<number>(0)
    const mounted = useMounted()

    const {fields} = useFieldArray({
        name: "variant_products",
        control: form.control,
    })

    const {fields:child} = useFieldArray({
        name: "variant_products.children",
        control: form.control,
    })

    const ouput = [
        {
            name:"red",
            children:[
                {
                    name: "S",
                    quantity: 12,
                    price: 12
                },
                {
                    name: "M",
                    quantity: 34,
                    price: 6666
                }
            ]
        },
        {
            name:"blue",
            children:[
                {
                    name: "S",
                    quantity: 12,
                    price: 12
                },
                {
                    name: "M",
                    quantity: 34,
                    price: 6666
                }
            ]
        }
    ]
    // React.useEffect(() => {
    //     const indexData = data.findIndex((i) => i.name === group)
    //     setCurrentIndex(indexData)
    // },[])
    // React.useEffect(() => {
    //     if (data.length === 1) setOptionData( null);
    //     const otherOption = data.filter((_, j) => j !== currentIndex)
    //     if (otherOption.length === 1) { setOptionData(otherOption[0].value)  }
    //     else {
    //         const newData = otherOption[0]?.value.flatMap((i) => otherOption[1].value.map((j) => `${i.value}/${j.value}`));
    //         setOptionData(newData);
    //     }
    //
    // },[currentIndex, data]);




    const currentIndex = React.useMemo(() => {
        if (!group) return 0;
        else return data.findIndex((i) => i.name === group)
    }, [group, data])


    const optionData = React.useMemo(() => {
        if (data.length === 1) return null;
        const otherOption = data.filter((_, j) => j !== currentIndex)

        if (otherOption.length === 1) return otherOption[0].value;
        else return otherOption[0].value.flatMap((i) => otherOption[1].value.map((j) => `${i.value}/${j.value}`))
    }, [currentIndex, data])




    if (mounted) return (
        <div className="space-y-3">
            <div className={clsx({
                "hidden": data.length <= 1
            })}>
                <Select onValueChange={(e) => {
                    setGroup(e);
                    setCollapse([])
                }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={group ?? data[currentIndex]?.name}/>
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
         <div>
             {JSON.stringify(form.watch('variant_products', undefined, 4))}
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
                        <React.Fragment key={`fmt_${j}`}>
                            {fields.map((field, index) => (
                                <React.Fragment key={j}>
                                    <TableRow key={j}>
                                        <TableCell onClick={(e) => {
                                            if (!collapse.includes(i.value)) setCollapse([...collapse, i.value])
                                            else setCollapse((prev) => prev?.filter((j) => j !== i.value))
                                        }}>
                                            <div className={clsx('font-bold', {
                                                "cursor-pointer": data.length !== 1
                                            })}>
                                                <FormField
                                                    control={form.control}
                                                    name={`variant_products.${j}.name`}
                                                    defaultValue={i.value}
                                                    key={`variant_products.${j}.name`}
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input {...field} value={i.value}
                                                                       className="font-bold" readOnly/>
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                        </TableCell>
                                        <TableCell>
                                            <FormField
                                                control={form.control}
                                                name={`variant_products.${j}.price`}
                                                key={`variant_products.${j}.price`}
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input {...field} className="font-bold"
                                                                   placeholder={`variant_products.${j}.price`}
                                                                   readOnly={data.length !== 1}
                                                                   disabled={data.length !== 1}
                                                            />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />

                                        </TableCell>
                                        <TableCell>

                                            <FormField
                                                control={form.control}
                                                name={`variant_products.${j}.quantity`}
                                                key={`variant_products.${j}.quantity`}
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input {...field}
                                                                   placeholder={`variant_products.${j}.quantity`}
                                                                   readOnly={data.length !== 1}
                                                                   disabled={data.length !== 1}/>
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />


                                        </TableCell>
                                    </TableRow>
                                    {optionData && optionData.map((option:any, optionIndex:any) => (
                                        <TableRow key={optionIndex} className={clsx({
                                            'hidden': !collapse.includes(i.value),
                                            '': collapse.includes(i.value)
                                        })}>

                                            <TableCell>{typeof option === "string" ? option : option?.value}</TableCell>
                                            <TableCell>
                                               <Input />

                                            </TableCell>
                                            <TableCell>
                                               <Input />

                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </React.Fragment>))}
                        </React.Fragment>
                    ))}


                </TableBody>
            </Table>


        </div>
    )
}