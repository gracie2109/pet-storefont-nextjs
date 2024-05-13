'use client';
import * as React from 'react';
import {NewsForms} from "@/components/forms/news-forms";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {newsEditSchema, newsSchema, newInitValue, newsEditInfer, newsInfer} from "@/validations/news";
import {setValuesOfForm} from "@/lib/helpers";
import toast from "react-hot-toast";
import {createNewPost, updatePost} from "@/api-requests/news";
import {INews} from "@/types/news";


interface Props {
    params: string,
    postSelected: INews,
    mode: string
}

export function NewsHandleTemplate({params, postSelected, mode}: Props) {
    const form = useForm<newsInfer | newsEditInfer>({
        mode: "all",
        resolver: zodResolver(mode ==="create" ? newsSchema : newsEditSchema),
        defaultValues: mode === "edit" ? postSelected : newInitValue,
    });

    const submitHandler = (value: any) => {

        if (params === "create") {
            toast.promise((createNewPost(value)), {
                loading: "Creating...",
                error: (err: any) => {
                    console.log("err", err);
                    return "Creat post fail!"
                },
                success: (data: any) => {
                    console.log(data);
                    return "Create post success!"
                }
            })
        } else {
            value.id = params;
            toast.promise((updatePost(value)), {
                loading: "Updating...",
                error: (err: any) => {
                    console.log("err", err);
                    return "Update post fail!"
                },
                success: (data: any) => {
                    console.log(data);
                    return "Update post success!"
                }
            })
        }
    };

    React.useEffect(() => {
        if (postSelected && mode !== "create") {
            setValuesOfForm(postSelected, form)
        }
    }, [postSelected, mode])


    return (
        <React.Fragment>
            <NewsForms
                form={form}
                submitHandler={submitHandler}
                loading={false}
                mode={params}
            />
        </React.Fragment>
    )
}