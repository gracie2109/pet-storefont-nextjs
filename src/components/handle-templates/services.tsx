'use client';

import * as  React from "react"
import {ServiceForm} from "@/components/forms/service-form";
import {useFieldArray, useForm} from "react-hook-form";
import {useState} from "react";
import {serviceEditInfer, serviceEditSchema, serviceSchema, serviceInfer, serviceInit} from "@/validations/services"
import {zodResolver} from "@hookform/resolvers/zod";
import {createService} from "@/api-requests/services"
import {IService} from "@/types/service";
import {setValuesOfForm} from "@/lib/helpers";

interface ServiceHandleTemplateProps {
    params: string,
    data?: IService,
    weights?: any[],
    pets?: any[]

}

export function ServiceHandleTemplate({params, data, weights, pets}: ServiceHandleTemplateProps) {

    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm<serviceEditInfer | serviceInfer>({
        defaultValues: params == "create" ? serviceInit : data,
        resolver: zodResolver(params == "create" ? serviceSchema : serviceEditSchema),
    });




    React.useEffect(() => {
        if (data && params !== "create") {
            setValuesOfForm(data, form)
        }
    }, [data, params])

    const handleSubmit = async (values: any) => {
        // await createService(values)
        //     .then((data) => {
        //         console.log("success", data)
        //         form.reset()
        //     }).catch((err) => {
        //         console.log("error", err)
        //     })

        console.log("values", values)
    }

    return (
        <>
            <ServiceForm
                submitHandler={handleSubmit}
                form={form}
                loading={loading}
                mode={params}
                weights={weights ?? []}
                pets={pets ?? []}
            />
        </>

    )
}