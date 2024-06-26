'use server';

import http from "@/configs/http"
import {endPoint} from "@/configs/endpoint";
import {revalidateTag} from "next/cache";
import {IPermissionFetchResponse, IRoles} from "@/types/roles";
import next from "next";


export const getListRoles = async (): Promise<IRoles[]> => {
    const {payload} = await http.get(endPoint.getListRoles, {
        next: {
            tags: ['roles'],
            revalidate: 360
        },
    });
    return payload?.data
}


export const getDetailRoles = async (input: string): Promise<any> => {
    if (input && input !== "create") {
        return await http.get(`${endPoint.getDetailRole}/${input}`, {
            next: {tags: ['roles', input]},
            cache: 'no-cache'
        });

    } else {
        return
    }
}

export const getPermissions = async (): Promise<IPermissionFetchResponse> => {
    const {payload} = await http.get(endPoint.getListPermissions,{ cache: 'no-cache' });
    return payload?.data
}


export const deleteRole = async (input: string) => {
    if (!input) return
    const data = await http.delete(`${endPoint.deleteRole}/${input}`);
    if (data.status === 200) {
        return revalidateTag('roles')
    }
}


export const createNewRole = async (input: any) => {
    if (!input) return;
    const data = await http.post(endPoint.createRole, input);
    if (data.status === 200) {
        revalidateTag('roles');
    }
}

export const updateRole = async (input: string) => {
    if (!input) return;
    const data = await http.patch(endPoint.updateRole, input,{ cache: 'no-cache' });
    if (data.status === 200) {
        revalidateTag(['roles', input.id]);
    }
}