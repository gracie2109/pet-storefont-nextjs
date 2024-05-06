'use client';

import * as  React from "react"
import {ServiceForm} from "@/components/forms/service-form";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {roleInit, roleInfer, roleSchema} from "@/validations/roles"
import {zodResolver} from "@hookform/resolvers/zod";

import {setValuesOfForm} from "@/lib/helpers";
import {RoleForm} from "@/components/forms/role-form";
import {IPermissionFetchResponse} from "@/types/roles";
import {serviceSchema} from "@/validations/services";

interface ServiceHandleTemplateProps {
    params: string,
    data?: any,
    permissions?: IPermissionFetchResponse
}

export function RoleHandleTemplate({params, data, permissions}: ServiceHandleTemplateProps) {

    const form = useForm({
        defaultValues: roleInit,
        resolver: zodResolver(roleSchema),
    });


    const handleSubmit = async (values: any) => {
        console.log("handleSubmit", values)
    }

    React.useEffect(() => {
        if (data && params !== "create") {
            setValuesOfForm(data, form)
        }
    }, [data, params])


    return (
        <RoleForm
            submitHandler={handleSubmit}
            form={form}
            mode={params}
            permissions={permissions}
        />
    )
}