'use client';

import {Button} from "@/components/ui/button";
import React from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormMessage, FormLabel, FormDescription} from  "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {zodResolver} from "@hookform/resolvers/zod";
import {Textarea} from "@/components/ui/textarea";
import {DialogC} from "@/components/dialog-c"
import {toast} from "react-hot-toast";

const cancelSchema = z.object({
    reason: z.string().min(2, {
        message: "You need to specify a reason"
    }),
    reason_value: z.string().min(2, {
        message: "You need to specify a reason"
    }),
})

const sampleCancelReason = [
    "Change of shopping intention",
    "Found a better price or deal elsewhere",
    "Product out of stock or unavailable",
    "Ordering mistake",
    "Change in order details",
    "Other"
]

export function CancelOrderShell () {
    const [open, setOpen] = React.useState<boolean>(false);
    const [otherFlag, setOtherFlag] = React.useState<boolean>(false);
    const form = useForm({
        defaultValues: {
            reason: "",
            reason_value:""
        },
        resolver:zodResolver(cancelSchema)

    });

    const reset = () => {
        form.resetField('reason_value');
        setOtherFlag(false);
        form.resetField("reason")
    }
    const onCancelOrder = (value:z.infer<typeof cancelSchema>) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Promise resolved after 5 seconds");
            }, 2000);
        })
            .then((data) => {
                toast.success('Cancel success');
                reset();
                setOpen(false)
            })
            .catch((data) => {
                toast.error('Cancel fail');
                reset();
                setOpen(false)
            });

    }
    return (
        <>
            <Button className="" variant="destructive" onClick={() => setOpen(!open)}>Cancel Order</Button>
            {open && ( <DialogC
                open={open}
                setOpen={setOpen}
                title={"Cancel Order"}
                desc={"Tell me the reason"}
                handleClose={reset}
                >
                <Form {...form}>

                    <form onSubmit={form.handleSubmit(onCancelOrder)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="reason"
                            render={({field}) => (
                                <FormItem className="space-y-3">
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={(e) => {
                                                field.onChange(e);
                                                if (e === "Other") setOtherFlag(true);
                                                else {
                                                    form.resetField('reason_value');
                                                    setOtherFlag(false);
                                                    form.setValue('reason_value', e)
                                                }
                                            }}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            {sampleCancelReason.map((i, j) => (
                                                <FormItem className="flex items-center space-x-3 space-y-0" key={j}>
                                                    <FormControl>
                                                        <RadioGroupItem value={i}/>
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {i}
                                                    </FormLabel>
                                                </FormItem>
                                            ))}

                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />


                        {otherFlag && (
                            <FormField
                                control={form.control}
                                name="reason_value"
                                render={({field}) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Cancel Reason</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Reason you canceled this order"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        )}


                        <Button>Submit</Button>
                    </form>

                </Form>
            </DialogC>

            )}
        </>
    )
}