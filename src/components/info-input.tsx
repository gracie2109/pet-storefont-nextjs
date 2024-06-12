'use client';

import React from "react";
import {Info} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {Input} from "@/components/ui/input";

interface Props{
    desc:React.ReactNode,
    form:any,
    inputName:string,
    label:string,
}

export function InfoInput ({desc, form,inputName, label}:Props) {
    const id = React.useId();
    return (
        <>
            <FormField
                key={id}
                control={form.control}
                name={inputName}
                render={({field}) => (
                    <FormItem className="relative">
                        <FormLabel>{label}</FormLabel>
                        <FormControl className="relative">
                            <Input placeholder={label} {...field} className="relative"/>
                        </FormControl>
                        <div className="absolute right-2.5 bottom-[3.25px] cursor-pointer grid place-items-center" >
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info className="w-4 text-gray-500"/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <>{desc}</>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                        </div>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </>
    )
}