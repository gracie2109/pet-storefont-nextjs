'use server';

import http from "@/configs/http"
import {endPoint} from "@/configs/endpoint";
import {revalidateTag} from "next/cache";
import {IPermissionFetchResponse, IRoles} from "@/types/roles";


export const getListRoles = async (): Promise<IRoles[]> => {
    const {payload} = await http.get(endPoint.getListRoles, {
        next: {tags: ['roles'],
        revalidate: 360
        },
    });
    return payload?.data
}


export const getDetailRoles = async (input: string): Promise<any> => {
    if (input && input !== "create") {
        return await http.get(`${endPoint.getDetailRole}/${input}`, {
            next: {tags: ['roles', input]}
        });

    } else {
        return
    }
}

export const getPermissions = async (): Promise<IPermissionFetchResponse> => {
    const {payload} = await http.get(endPoint.getListPermissions);
    return payload?.data
}


export const deleteRole = async (input: string) => {
    if (!input) return
    const data = await http.delete(`${endPoint.deleteRole}/${input}`);
    if (data.status === 200) {
        return revalidateTag('roles')
    }
}


export const createNewRole = async(input:Pick<IRoles, 'name' | 'permissions'>) => {
    if(!input) return;
    const data = await http.post(endPoint.createRole, input);
    if(data.status === 200){
        return revalidateTag('roles')
    }
}

