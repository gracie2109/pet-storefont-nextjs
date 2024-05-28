'use server';

import http from "@/configs/http";
import {endPoint} from "@/configs/endpoint";
import {unstable_cache} from 'next/cache';

export const getListCategories = unstable_cache(async () => {
    const data = await http.get(endPoint.getListCategories);
    return data
},['categories'])

