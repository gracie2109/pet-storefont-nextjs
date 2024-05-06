'use client';

import * as  React from "react"
import { ServiceForm } from "@/components/forms/service-form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { serviceEditInfer, serviceEditSchema, serviceSchema, serviceInfer, serviceInit } from "@/validations/services"
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { createService } from "@/api-requests/services"
import { IService } from "@/types/service";
import { setValuesOfForm } from "@/lib/helpers";

interface ServiceHandleTemplateProps {
    params: string,
    data?: IService
}

export function ServiceHandleTemplate({ params, data }: ServiceHandleTemplateProps) {

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
        await createService(values).then((data) => {
            form.reset()
        })
    }

    return (
        <ServiceForm
            submitHandler={handleSubmit}
            form={form}
            loading={loading}
            mode={params}
        />
    )
}