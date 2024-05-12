'use client';

import {PetConfigServicePriceForm} from "@/components/forms/pet-config-service-price-form";
import {useForm} from "react-hook-form";
import * as React from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {setPriceForService, updatePrice} from "@/api-requests/pets";
import {convertSettingPriceOfServiceData, setValuesOfForm} from "@/lib/helpers";


export function PetsConfigServicePrice({service, weights, params, serviceSelected, mode}: any) {
    const router = useRouter();

    const form = useForm({
        mode: "all"
    });

    React.useEffect(() => {
        if (mode === "edit" && serviceSelected !== null) {
            const transformedData = {};
            serviceSelected.forEach((item: any) => {
                // @ts-ignore
                transformedData[item.weightId.id] = item.price;
            });
            setValuesOfForm(transformedData, form)
        }
    }, [mode, serviceSelected])


    const submitHandler = (value: any) => {
        if (mode !== "edit") {
            const convertData = convertSettingPriceOfServiceData(value);
            const payload = {
                data: convertData,
                petId: params.petId,
                serviceId: params.serviceId
            }
            toast.promise((setPriceForService(payload)), {
                loading: "Setting price...",
                success: (data: any) => {
                    console.log("success", data);
                    form.reset();
                    return "Setting price success"
                },
                error: (data: any) => {
                    console.log("error", data);
                    return "Setting price error"
                }
            })
        } else {
            const convertDataUpdate = convertSettingPriceOfServiceData(value, serviceSelected);
            const updateData = convertDataUpdate?.filter((i) => i.price !== "undefined");
            toast.promise((updatePrice(updateData, params.petId)), {
                loading: "Setting price...",
                success: (success: any) => {
                    console.log("success", success);
                    return "success"
                },
                error: (error: any) => {
                    console.log("error", error);
                    return "error"
                }
            })
        }
    }

    return (
        <PetConfigServicePriceForm
            form={form}
            submitHandler={submitHandler}
            weights={weights}
            serviceStatus={service.status}
            showAlert={true}
        />

    )
}