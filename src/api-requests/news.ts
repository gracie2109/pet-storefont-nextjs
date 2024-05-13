'use server';

import http from "@/configs/http";
import {endPoint} from "@/configs/endpoint";
import {revalidateTag} from "next/cache";

export const createNewPost = async (input: any) => {
    const data = await http.post(endPoint.createNewPost, input, {
        cache: "no-store"
    });
    if (data.status == 200) {
        return revalidateTag('post')
    }
    return data;
}

export const getListPost = async () => {
    const data = await http.get(endPoint.getListPost,{
        next:{
            tags: ['post'],
        }
    });
    return data
}