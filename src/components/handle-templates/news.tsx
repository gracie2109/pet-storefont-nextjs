'use client';
import * as React from 'react';
import {NewsForms} from "@/components/forms/news-forms";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {newsEditSchema, newsSchema, newInitValue, newsEditInfer, newsInfer} from "@/validations/news";
import {setValuesOfForm} from "@/lib/helpers";
import toast from "react-hot-toast";
import { createNewPostFn, updatePost} from "@/api-requests/news";
import {FileWithPreview} from "@/types";
import {convertImageServerToPreview, uploadFiles} from "@/lib/utils";
import {INews} from "@/types/news";



interface Props {
    params: string,
    postSelected?: INews
}

export function NewsHandleTemplate({params, postSelected}: Props) {
    const [images, setImages] = React.useState<FileWithPreview[] | null>(null);
    const form = useForm<newsInfer | newsEditInfer>({
        mode: "all",
        resolver: zodResolver(params ==="create" ? newsSchema : newsEditSchema),
        defaultValues: params === "create" ? newInitValue:postSelected,
    });

    const onSubmit = async (values: any) => {
        const data = (params === "create" ) ? { ...values } : {...values, id: params};
        if (images) {
            const uploadedImages = await uploadFiles(images, "news");
            data.images = uploadedImages;
        }

        const toastPromise = toast.promise(
            params === "create" ? createNewPostFn(data) : updatePost(data),
            {
                loading: "Loading...",
                error: (err: any) => {
                    console.log("err", err);
                    return params === "create"
                        ? "Create news fail!"
                        : "Update news fail!";
                },
                success: (data: any) => {
                    form.reset();
                    setImages([]);
                    return params === "create"
                        ? "Create news success!"
                        : "Update news success!";
                },
            }
        );

        return toastPromise;
    };
    React.useEffect(() => {
        if (postSelected && params !== "create") {
            setValuesOfForm(postSelected, form);
            const newImages = convertImageServerToPreview(postSelected?.images);
            setImages(newImages)
        }
    }, [postSelected, params])


    return (
        <React.Fragment>
            <NewsForms
                form={form}
                submitHandler={onSubmit}
                loading={false}
                mode={params}
                images={images}
                setImages={setImages}
            />
        </React.Fragment>
    )
}