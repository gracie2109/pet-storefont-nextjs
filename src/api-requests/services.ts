'use server'

import http from "@/configs/http"
import {endPoint} from "@/configs/endpoint";
import {revalidateTag} from "next/cache";
import {IServiceFetchResponse} from "@/types/service";
import Error from 'next/error';



export const getListServices = async (): Promise<IServiceFetchResponse> => {
    const result = await http.get(endPoint.getListServices, {
        next: {
            tags: ['services'],
            revalidate: 3600
        },

    });
    return result
}


export const createService = async (input: any) => {
    const data = await http.post(endPoint.createService, input);
    if (data.status === 200) {
        return revalidateTag('services')
    }

    console.log("createServicecreateServicecreateServicecreateService", data)
    return data
}

export const getDetailService = async (input: string) => {
    if (input && input !== "create") {
        const data = await http.get(`${endPoint.getDetailService}/${input}`, {
            next: {tags: ['services', input]}
        });
        return data
    } else {
        return
    }
}

export const deleteService = async (input: string) => {
    if (!input) return
    const data = await http.delete(`${endPoint.deleteService}/${input}`);
    if (data.status === 200) {
        return revalidateTag('services')
    }
}
