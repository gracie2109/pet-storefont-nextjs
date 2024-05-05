'use client';
import * as React from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import {ReloadIcon} from "@radix-ui/react-icons"
import {useForm, UseFormReturn} from "react-hook-form";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {recoverPasswordSchema} from "@/validations/authentication";
import {z} from "zod";


export function RecoverPasswordForm() {
    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm({
        resolver: zodResolver(recoverPasswordSchema),
        defaultValues: {password: "", confirmPassword: ""},
        mode: "all"
    });
    const onSubmit = (value: z.infer<typeof recoverPasswordSchema>) => {
        try {
            setLoading(true);
        } catch (err) {
            setLoading(false);
            console.log("err", err)
        } finally {
            setLoading(false);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>password</FormLabel>
                            <FormControl>
                                <Input type={"password"} placeholder="********" {...field} />
                            </FormControl>

                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>confirmPassword</FormLabel>
                            <FormControl>
                                <Input type={"password"} placeholder="********" {...field} />
                            </FormControl>

                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button disabled={loading} type="submit">
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