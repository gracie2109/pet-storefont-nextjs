'use server';


import http from "@/configs/http";
import {endPoint} from "@/configs/endpoint";
import {revalidateTag} from "next/cache";

export const getListCustomers = async() => {

    const data = await http.get(endPoint.getListCustomers, {
        next: {tags: ['customers']},
        revalidate: 360
    });
    return data
}

export const getDetailUser = async(id: string) => {
    if(!id || id === "create") return null
    const data = await http.get(`${endPoint.getDetailUser}/${id}`);
    return data
}