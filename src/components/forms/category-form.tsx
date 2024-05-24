'use client';
import {useForm, UseFormReturn} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import * as React from "react";
import {Button} from "@/components/ui/button";
import {PlusCircle, UploadCloudIcon} from "lucide-react";

import {FileDialog} from "@/components/file-dialog";
import {FileWithPreview} from "@/types";
import {useMounted} from "@/hooks/use-mounted";


interface Props {
    form: UseFormReturn<any>,
    submitHandler: (value: any) => void
}

export function CategoryForm({form, submitHandler}: Props) {
    const mount = useMounted();
    const [thumbnail, setThumbnail] = React.useState<FileWithPreview[] | null>(null)
    const [isPending, startTransition] = React.useTransition()
    const [isZoomed, setIsZoomed] = React.useState(false);
    const [openSheet, setOpenSheet] = React.useState<boolean>(false);
    const [listImage, setListImage] = React.useState<any[]>([])
    const [clickItem, setClickItem] = React.useState<any[]>([])
    const [activeContact, setActiveContact] =  React.useState<any[] | null>(null);


    const handleZoomChange = React.useCallback((shouldZoom:any) => {
        setIsZoomed(shouldZoom)
    }, []);

    const uploadImage =() => {
        console.log("thumbnail",thumbnail)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className='space-y-8'>
                <div className="grid grid-cols-2 gap-3 w-full">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Category name</FormLabel>
                                <FormControl>
                                    <Input autoFocus={false} placeholder="name" {...field} />
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
                                <FormLabel>Category description</FormLabel>
                                <FormControl>
                                    <Input autoFocus={false} placeholder="description" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button variant="outline" onClick={() => setOpenSheet(true)}>
                        <PlusCircle className="w-4 h-4 mr-2"/> Upload
                    </Button>

                </div>
                <Button type="submit">
                    Submit
                </Button>
            </form>
        </Form>
    )
}