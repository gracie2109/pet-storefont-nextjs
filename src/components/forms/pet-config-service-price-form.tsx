'use client';

import {UseFormReturn} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import * as React from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"


interface Props {
    form: UseFormReturn<any>,
    submitHandler: (value: any) => void,
    weights: any[],
    serviceStatus:boolean,
    showAlert:boolean
}

export function PetConfigServicePriceForm({form, submitHandler, weights, serviceStatus, showAlert}: Props) {
    return (
       <>
           {showAlert && !serviceStatus &&  (
               <Alert variant="destructive" className="max-w-screen-sm">
                   <ExclamationTriangleIcon className="h-4 w-4" />
                   <AlertTitle>Error</AlertTitle>
                   <AlertDescription>
                       Your service is block. Please unblock after set price.
                   </AlertDescription>
               </Alert>
           )}
           <Form {...form} >
               <form onSubmit={form.handleSubmit(submitHandler)}>
                   <div className="mt-3">
                       {weights ? (
                           <div className=" rounded-lg">
                               <div className=" px-4 py-2 flex font-semibold">
                                   <div className="w-1/2">Weight</div>
                                   <div className="w-1/2">Price</div>
                               </div>
                               <div className="divide-y divide-gray-200">
                                   {weights?.map((item, index) => (
                                       <React.Fragment key={index}>
                                           <div className="flex px-4 py-2">
                                               <div className="w-1/2  font-medium">{item?.name}</div>
                                               <div className="w-1/2">
                                                   <FormField
                                                       control={form.control}
                                                       name={item?._id}
                                                       render={({field}) => {
                                                           return (
                                                               <FormItem>
                                                                   <FormControl>
                                                                       <Input
                                                                           data-name={item?._id}
                                                                           data-id={item?._id}
                                                                           disabled={!serviceStatus}
                                                                           placeholder="Enter price"
                                                                           type="number"
                                                                           value={field.value ? field.value : ""}
                                                                           onChange={field.onChange}
                                                                           className="w-full  rounded-md  shadow-sm focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                                                                       />
                                                                   </FormControl>
                                                                   <FormMessage/>
                                                               </FormItem>
                                                           );
                                                       }}
                                                   />
                                               </div>
                                           </div>
                                       </React.Fragment>
                                   ))}
                               </div>
                           </div>
                       ) : (
                           <>Loading...</>
                       )}
                   </div>
                   <Button className="mt-3" disabled={!serviceStatus}>
                       Submit
                   </Button>
               </form>
           </Form>
       </>
    )
}