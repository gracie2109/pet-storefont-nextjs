'use client';

import {
    FormMessage,
    FormLabel,
    useFormField,
    FormItem,
    FormField,
    FormDescription,
    FormControl,
    Form
} from "@/components/ui/form"
import {UseFormReturn} from "react-hook-form";
import {Input} from "@/components/ui/input";
import * as React from "react";
import {Button} from "@/components/ui/button";
import {ReloadIcon} from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import SunEditorCore from "suneditor/src/lib/core";

import 'suneditor/dist/css/suneditor.min.css';
import {sunEditorSetting} from "@/configs/rich-text-editor";
import {Textarea} from "@/components/ui/textarea";
import {RichTextEditor} from "@/components/rich-text-editor";
import MultipleSelector from "@/components/multiple-selector";
import {modifySelectValue} from "@/lib/helpers";
import {sampleTags} from "@/lib/contants";
import {Switch} from "@/components/ui/switch";

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});


interface Props {
    form: UseFormReturn<any>,
    submitHandler: (value: any) => void,
    loading: boolean,
    mode: string
}


export function NewsForms({form, submitHandler, loading, mode}: Props) {
    const [isTriggered, setIsTriggered] = React.useState(false);


    const optionsMenmo = React.useMemo(() => {
        return sunEditorSetting
    }, []);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">

                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Post name</FormLabel>
                                <FormControl>
                                    <Input autoFocus={false} placeholder="name" {...field} />
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
                                    <Input autoFocus={false} placeholder="name" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="preview"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Post preview</FormLabel>
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

                </div>
                <FormField
                    control={form.control}
                    name="content"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Post content</FormLabel>
                            <FormControl>
                                <RichTextEditor field={field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tags"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                                <MultipleSelector
                                    {...field}
                                    onChange={field.onChange}
                                    placeholder="Select or create tags"
                                    options={modifySelectValue(sampleTags)}
                                    hidePlaceholderWhenSelected
                                    creatable
                                    loadingIndicator={
                                        <p className="py-2 text-center text-lg leading-10 text-muted-foreground">loading...</p>
                                    }
                                    emptyIndicator={
                                        <p className="w-full text-center text-lg leading-10 text-muted-foreground">
                                            no results found.
                                        </p>
                                    }
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

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