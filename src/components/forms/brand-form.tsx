"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {UseFormReturn} from "react-hook-form";
import {Switch} from "@/components/ui/switch";
import {Textarea} from "@/components/ui/textarea";
import {FileDialog} from "@/components/file-dialog";
import {RenderImage} from "@/components/render-image";
import {FileWithPreview} from "@/types";


interface BrandFormProps {
    form: UseFormReturn<any>,
    onSubmit:(value:any) => void,
    mode:string,
    images: FileWithPreview[] | null
    setImages: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>
}

export function BrandForm({
                             form,
                             onSubmit,
                             mode,
                              images,
                              setImages
                         }: BrandFormProps) {
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        name="images"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Post Cover</FormLabel>
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

                    <FormField
                        control={form.control}
                        name="desc"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us a little bit about yourself"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
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
                    <Button
                        type="submit"

                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </>
    );
}
