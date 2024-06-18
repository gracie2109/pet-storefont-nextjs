'use client';

import {UseFormReturn} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField,FormDescription} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import * as React from "react";
import {FileDialog} from "@/components/file-dialog";
import {RenderImage} from "@/components/render-image";
import {FileWithPreview} from "@/types";
import {IRoles} from "@/types/roles";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {clsx} from "clsx";



type Props = {
    form: UseFormReturn<any>,
    handleUserForm:(value:any) => void,
    images: FileWithPreview[] | null
    setImages: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>,
    roles?: IRoles[],
    mode: string,
    userSelected?: any
}

export function UserForm ({form, handleUserForm, images, setImages, roles, mode, userSelected}: Props) {
    console.log("mode",userSelected)
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(handleUserForm)} className="space-y-3 w-full">
                {mode !== "profile" && (
                    <FormField
                        control={form.control}
                        name="images"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>User Cover</FormLabel>
                                <FormControl>
                                    <div className="flex gap-3 relative">
                                        <FileDialog name={"images"}
                                                    maxFiles={1}
                                                    files={images}
                                                    setFiles={setImages}
                                        />
                                        <RenderImage images={images} setImages={setImages} isPreviewMode={false} />
                                    </div>

                                </FormControl>


                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                )}
                <FormField
                    control={form.control}
                    name="username"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>User Name</FormLabel>
                            <FormControl>
                                <Input  placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>name</FormLabel>
                            <FormControl>
                                <Input  placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <div className={clsx("grid md:grid-cols-2 xs:grid-col-1 gap-3 items-center justify-between", {
                    "hidden": mode !== "create"
                })}>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input  placeholder="********" {...field} className="w-full" />
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
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input  placeholder="********" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                </div>

                    <div className={clsx("",{
                         "hidden" : userSelected && userSelected._id === process.env.NEXT_PUBLIC_CURRENT_USER_ID || mode === "profile" }
                    )}>

                        <FormField
                            control={form.control}
                            name="roles"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Roles</FormLabel>
                                        <FormDescription>
                                            Select the roles
                                        </FormDescription>
                                    </div>
                                    {roles && roles.map((item) => (
                                        <FormField
                                            key={item._id}
                                            control={form.control}
                                            name="roles"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={item._id}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(item._id)}
                                                                onCheckedChange={(checked) => {
                                                                    if(checked) {
                                                                        if(!field.value) field.onChange([item._id]);
                                                                        else field.onChange([...field.value, item._id]);
                                                                    }else {
                                                                        field.onChange(field.value.filter((val:any) => val!== item._id));
                                                                    }

                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {item.name}
                                                        </FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />




                    </div>

                <Button type="submit" className="mt-5">
                    Submit
                </Button>
            </form>
        </Form>
    )
}