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
    const data = await http.get(endPoint.getListPost, {
        next: {
            tags: ['post'],
            revalidate: 360
        }
    });
    return data
}

export const deletePost = async (input: string) => {
    if (!input) return;
    const data = await http.delete(`${endPoint.deletePost}/${input}`);
    if (data.status == 200) {
        return revalidateTag('post')
    }
    return data
}


export const getDetailPost = async (input: string) => {
    if (!input) return;
    const data = await http.get(`${endPoint.getDetailPost}/${input}`, {
        next: {
            tags: [`post${input}`],
            revalidate: 360
        }
    });
    return data

}


export const updatePost = async (input: any) => {
    if (!input) return;
    const data = await http.patch(endPoint.updatePost, input);
    if (data.status == 200) {
        return revalidateTag(`post${input.id}`)
    }
}
