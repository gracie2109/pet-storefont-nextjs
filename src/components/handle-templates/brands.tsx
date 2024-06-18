'use client';

import * as  React from "react";
import {useForm} from "react-hook-form";
import {setValuesOfForm} from "@/lib/helpers";
import {BrandForm} from "@/components/forms/brand-form";
import {FileWithPreview} from "@/types";
import {toast} from "react-hot-toast";
import {createBrands, updateBrand} from "@/api-requests/brands";

interface BrandHandleTemplateProps {
    params: string,
    data?: any,
}

export function BrandHandleTemplate({params, data}: BrandHandleTemplateProps) {
    const [images, setImages] = React.useState<FileWithPreview[] | null>(null);
    const form = useForm();

    const handleSubmit =  (values: any) => {
        values.images = images;
        console.log("submit", values)
        if(params == "create"){
            toast.promise((createBrands(values)), {
                loading: "Creating...",
                error:(err:any) => {
                    console.log("err", err);
                    return "Creat role fail!"
                },
                success: (data: any) => {
                    console.log("success", data);
                    form.reset()
                    return "Create role success!"
                }
            })
        }else{
            const payload = {...values, id:params}

            toast.promise((updateBrand(payload)), {
                loading: "Creating...",
                error:(err:any) => {
                    console.log("err", err);
                    return "Creat role fail!"
                },
                success: (data: any) => {
                    console.log("success", data);
                    form.reset()
                    return "Create role success!"
                }
            })
        }
    }

    React.useEffect(() => {
        if (data && params !== "create") {
            setValuesOfForm(data, form);
            const newImages = {
                url:data.images[0],
                preview: data.images[0],
                path: data.images[0],
                name:data.name,
                type:"image/png",

            } as FileWithPreview;

           setImages([newImages])
        }
    }, [data, params])

    return (
       <BrandForm
           onSubmit={handleSubmit}
           form={form}
           mode={params}
           images={images}
           setImages={setImages}
       />

    )
}