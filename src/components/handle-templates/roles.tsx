'use client';

import * as  React from "react";
import {useForm} from "react-hook-form";
import {roleInit, roleInfer, roleSchema} from "@/validations/roles"
import {zodResolver} from "@hookform/resolvers/zod";
import {setValuesOfForm} from "@/lib/helpers";
import {RoleForm} from "@/components/forms/role-form";
import {IPermissionFetchResponse} from "@/types/roles";
import toast from "react-hot-toast";
import {createNewRole} from "@/api-requests/roles"


interface ServiceHandleTemplateProps {
    params: string,
    data?: any,
    permissions?: IPermissionFetchResponse
}

export function RoleHandleTemplate({params, data, permissions}: ServiceHandleTemplateProps) {
    const [send, setSend] = React.useState<boolean>(false);
    const form = useForm({
        defaultValues: roleInit,
        resolver: zodResolver(roleSchema),
    });


    const handleSubmit =  (values: any) => {
        if(params == "create"){
            toast.promise((createNewRole(values)), {
                loading: "Creating...",
                error:(err:any) => {
                    console.log("err", err);
                    setSend(true)
                    return "Creat role fail!"
                },
                success: (data: any) => {
                    console.log("success", data);
                    return "Create role success!"
                }
            })
        }

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
            submitStt={send}

        />
    )
}