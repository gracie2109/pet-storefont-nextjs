'use client';

import * as React from 'react';
import {CategoryForm} from "@/components/forms/category-form";
import {useForm} from "react-hook-form";

export function CategoryHandleTemplate() {
    const form = useForm();

    const submitHandler = (value: any) => {
        console.log("vale", value)
    }
    return (
        <React.Fragment>
            <CategoryForm
                form={form}
                submitHandler={submitHandler}
            />
        </React.Fragment>
    )
}