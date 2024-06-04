'use client';

import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import * as React from "react";
import {ReloadIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import {Switch} from "@/components/ui/switch";
import {convertToVietnamTime} from "@/lib/helpers";
import {ServiceTimerShell} from "@/components/service-timer-shell";

interface ServiceFormProps {
    submitHandler: (value: any) => void,
    form: any,
    loading: boolean,
    mode: string,
}

export function ServiceForm({submitHandler, form, loading, mode}: ServiceFormProps) {

    return (
        <Form {...form}  >
            <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="name" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="desc"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Desc</FormLabel>
                            <FormControl>
                                <Input placeholder="desc" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="minTimeToDo"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Time to do</FormLabel>
                            <FormControl>
                                <Input  type="number" placeholder="desc" {...field} />
                            </FormControl>
                            <FormDescription>Enter min time to do this service <br/>
                                {convertToVietnamTime(form.watch("minTimeToDo"), "string")}
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                {mode !== "create" &&
                    <FormField
                        control={form.control}
                        name="status"
                        render={({field}) => (
                            <FormItem
                                className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                    <FormLabel>Status</FormLabel>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />}


             <div>



             </div>
                <Button type="submit" disabled={loading}>
                    {loading ? (
                        <>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                            Please wait

                        </>
                    ) : "Submit"}
                </Button>
            </form>
        </Form>
    )
}