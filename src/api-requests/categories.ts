'use server';

import http from "@/configs/http";
import {endPoint} from "@/configs/endpoint";
import {revalidateTag} from "next/cache";


export const getListCategories = async() => {
    const data = await http.get(endPoint.getListCategories, {
        next: {
            tags:['categories']
        }
    });
    return data
}