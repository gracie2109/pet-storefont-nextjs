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
import {IPost} from "@/types/post";



interface Props {
    params: string,
    postSelected: IPost
}


export function NewsHandleTemplate({params, postSelected}: Props) {
    const form = useForm<newsInfer | newsEditInfer>({
        mode: "all",
        resolver: zodResolver(params ==="create" ? newsSchema : newsEditSchema),
        defaultValues: params === "edit" ? postSelected : newInitValue,
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
        if (postSelected && params !== "create") {
            setValuesOfForm(postSelected, form)
        }
    }, [postSelected, params])


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