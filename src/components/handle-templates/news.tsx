'use client';
import * as React from 'react';
import {NewsForms} from "@/components/forms/news-forms";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {newsSchema} from "@/validations/news";
import {setValuesOfForm} from "@/lib/helpers";
import toast from "react-hot-toast";
import {createNewPost} from "@/api-requests/news";


interface Props {
    params: string
}

export function NewsHandleTemplate({params}: Props) {
    const form = useForm({
        mode: "all",
        resolver: zodResolver(newsSchema),
    });

    const submitHandler = (value: any) => {
        console.log("submitHandler", value);
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
        }
    };


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