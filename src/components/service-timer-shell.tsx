'use client'
import * as React from 'react';
import {Input} from "@/components/ui/input";
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {convertToVietnamTime, generateServiceTimeRow} from "@/lib/helpers";
import {cn} from "@/lib/utils";
import {useFieldArray} from "react-hook-form";



interface Props {
    weights?: any[],
    pets?: any[],
    form:any
}

export function ServiceTimerShell({weights, pets,form}: Props) {
    const { fields,append, prepend,  replace} = useFieldArray({
        name: "serviceTime",
        control: form.control,
    });
    React.useLayoutEffect(() => {
        if(pets && weights){
            const newRow = generateServiceTimeRow(pets, weights);
            if (newRow) {
                replace(newRow[0] as any)
            }
        }
    },[pets,weights]);

    return (
        <div>


            <div className="relative overflow-x-auto ">
                <table className=" table-auto">
                    <thead className="text-gray-700 uppercase p-2 text-center">
                    <tr>
                        <th className="border border-orange-400 cursor-pointer p-2 ">

                        </th>
                        {pets && pets.map((i: any, j: any) => (
                            <th className="border border-orange-400 cursor-pointer  " key={j}>
                                {i.name}
                            </th>
                        ))}

                    </tr>
                    </thead>
                    <tbody>

                    <>
                        {weights?.map((i: any, ii: any) => (
                            <tr key={ii} className="relative">
                                <td className="border border-orange-400 p-2">{i?.name}</td>
                                {pets?.map((j: any, jj: any) => (
                                    <td key={jj} className="border border-orange-400">
                                        {fields.map((field, index) => (
                                        <FormField
                                            control={form.control}
                                            name={`serviceTime.${index}.${j._id}.${i._id}.value`}
                                            key={`serviceTime_index_${index}.${field}`}
                                            render={({field}) => {
                                                return (
                                                    <>
                                                        <FormItem>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Input
                                                                        type="number"
                                                                        className="p-1  rounded-none relative w-[300px]"
                                                                        data-pet={j.id}
                                                                        data-weights={i.id}
                                                                        {...field}
                                                                        value={field.value ?? ""}
                                                                    />
                                                                    <small
                                                                        className={cn('text-[8px] absolute right-2 bottom-0')}>
                                                                        {!field.value ? convertToVietnamTime(form.watch(`serviceTime.${index}.${j._id}.${i._id}.value`), "string"): convertToVietnamTime(field.value, "string")}
                                                                    </small>
                                                                </div>

                                                            </FormControl>

                                                            <FormMessage/>
                                                        </FormItem>

                                                    </>
                                                );
                                            }}
                                        />

                                        ))}



                                    </td>

                                ))}
                            </tr>
                        ))}
                    </>

                    </tbody>
                </table>
            </div>

        </div>
    )
}

