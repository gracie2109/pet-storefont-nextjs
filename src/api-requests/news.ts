'use server';

import http from "@/configs/http"
import {endPoint} from "@/configs/endpoint";
import {revalidateTag} from "next/cache";
import {uploadFiles} from "@/lib/utils";
import {INews} from "@/types/news";


export const createNewPostFn = async (payload: any) => {
    try {
            const data = await http.post(endPoint.createNewPost, payload, {
                cache: "no-store"
            });
            if (data.status == 200) {
                return revalidateTag('post')
            }
            return data;
    } catch (err) {
        console.log(err);

    }
}

export const getListPost = async () => {
    const data = await http.get(endPoint.getListPost, {
        next: {
            tags: ['post'],
            revalidate: 100
        },
    });
    return data
}

export const deletePost = async (input: string) => {
    if (!input) return
    const data = await http.delete(`${endPoint.deletePost}/${input}`, {
        cache: 'no-store'
    });

    if (data.status == 200) {
        revalidateTag('post')
    }
    return data
}


export const updatePost = async (input: any) => {
    if (!input) return
    const data = await http.patch(endPoint.updatePost, input, {
        cache: 'no-store'
    });
    if (data.status == 200) {
        revalidateTag(`post/${input.id}`);
        revalidateTag('post')

    }

    return data
}

export const getDetailPost = async (input: string) => {
    if (!input) return
    const data = await http.get(`${endPoint.getDetailPost}/${input}`, {
        cache: 'no-store',
        next: {
            tags: [`post/${input}`]
        }
    });

    return data
}
export const getDetailPostBySlug = async (input: string) => {
    if (!input) return
    const data = await http.get(`${endPoint.getDetailPostBySlug}/${input}`, {
        cache: 'no-store',
        next: {
            tags: [`post/${input}`]
        }
    });

    return data
}