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
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import {ReloadIcon} from "@radix-ui/react-icons"
import {useForm, UseFormReturn} from "react-hook-form";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema, registerSchema} from "@/validations/authentication";
import {z} from "zod";
import {redirect, usePathname} from "next/navigation";
import {loginHandler} from "@/api-requests/authentication"
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export function AuthForm() {
    const pathname = usePathname()
    const [loading, setLoading] = useState<boolean>(false);
    const [mode, setMode] = React.useState<string | null>(null)
    const router = useRouter();
    React.useEffect(() => {
        const pageName = pathname.split("/")[1];
        setMode(pageName);
    }, [pathname])

    const form = useForm({
        resolver: zodResolver(mode === "register" ? registerSchema : loginSchema),
        defaultValues: mode === "register" ?
            {
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            } : {
                email: "",
                password: "",
            },
    });
    const onSubmit = async (value: z.infer<typeof registerSchema> | z.infer<typeof loginSchema>) => {
        try {
            setLoading(true);
            if (mode === "login") {
                await toast.promise((loginHandler(value)), {
                    loading: "Signin....",
                    success: (data: any) => {
                        return "Login successfully"
                    },
                    error: (data: any) => {
                        console.log("error", data);
                        return "Login error"
                    }
                })
            }

        } catch (err) {
            console.log(err);

        } finally {
            setLoading(false);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {mode == "register" &&
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />}
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email" {...field} />
                            </FormControl>

                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="password" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                {mode === "register" &&
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                }

                <Button disabled={loading}>
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