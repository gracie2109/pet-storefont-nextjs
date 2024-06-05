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
    const { fields,append, prepend,  } = useFieldArray({
        name: "serviceTime",
        control: form.control,
    });
    React.useEffect(() => {
        if(pets && weights){
            const newRow = generateServiceTimeRow(pets, weights);
            console.log("new",newRow)
            prepend(newRow)
        }
    },[pets,weights])
    console.log('fields', fields)
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
                                            name={`serviceTime.${index}.${j.id}.${i.id}.value`}
                                            key={field.id}
                                            render={({field}) => {
                                                return (
                                                    <>
                                                        <FormItem>
                                                            <FormControl>

                                                                <div className="relative">
                                                                    <Input
                                                                        type="number"
                                                                        className="p-1 border rounded-none relative "
                                                                        data-pet={j.id}
                                                                        data-weights={i.id}
                                                                        {...field}
                                                                        value={field.value ?? ""}

                                                                    />
                                                                    <small
                                                                        className={cn('text-[8px] absolute right-2 bottom-0')}>
                                                                        {convertToVietnamTime(form.watch(`serviceTime.${j._id}.${i._id}`), "string")}
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

