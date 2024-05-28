import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Switch} from "@/components/ui/switch";
import {Button} from "@/components/ui/button";
import {ReloadIcon} from "@radix-ui/react-icons";
import * as React from "react";
import {UseFormReturn} from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {PetIcons} from "@/components/icons";
import {ScrollArea} from "@/components/ui/scroll-area";

export function PetForm({form, submitHandler, mode, loading}: {
    form: UseFormReturn<any>,
    submitHandler: (values: UseFormReturn<any>) => void;
    mode: string | null,
    loading: boolean
}) {




    return (
        <>
            <Form {...form}  >
                <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"

                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input autoFocus={false} placeholder="name" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="icon"
                        render={({field}) => {
                            console.log("fields", field)
                           return (
                                <FormItem>
                                    <FormLabel>Icon</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder="Select a icon to display"
    
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                Object.entries(PetIcons).map(([key, value]) => {
                                                    const IconShow = value as any;
                                                    return (
                                                        <SelectItem key={key} value={key}>
                                                            <div className="flex items-center">
                                                                <IconShow className="w-4 h-4 mr-2"/>
                                                                {key}
                                                            </div>
                                                        </SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )
                        }}
                    />


                    {mode && mode !== "create" &&
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


        </>
    )
}