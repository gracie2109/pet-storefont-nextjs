'use client';


import {IRoles} from "@/types/roles";
import {UserForm} from "@/components/forms/user-handle-form"
import {useForm} from "react-hook-form";
import React from "react";
import {FileWithPreview} from "@/types";
import {ICustomers} from "@/types/customers";
import {setValuesOfForm} from "@/lib/helpers";
import {useMounted} from "@/hooks/use-mounted";





type Props = {
    roles: IRoles[],
    userSelected?: ICustomers,
    params: string
}

export function UserHandlePage ({roles, userSelected, params}:Props) {
    const mounted = useMounted()
    const [images, setImages] = React.useState<FileWithPreview[] | null>(null);
    const form = useForm({
        mode: "all",

    });
    const handleSubmit = (values: any) => {
        console.log("handleSubmit", values)
    }

    React.useEffect(() => {
        if(params !== "create" && userSelected) {
            setValuesOfForm(userSelected,form);
            form.setValue('roles', userSelected.roles);

        }
    },[params, userSelected])


    if(mounted) return (
        <>
           <UserForm  form={form}
                      handleUserForm={handleSubmit}
                      images={images}
                      setImages={setImages}
                      roles={roles}
                      mode={params}
                      userSelected={userSelected}
           />

        </>
    )
}