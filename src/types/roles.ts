import {ShareResponse} from "@/types/index";

export interface IPermissions extends ShareResponse {
    name: string,
    status: boolean,
    pername: string
}

interface CountDataOfMethods {
    [key: string]: number;
}

export interface IPermissionFetchResponse {
    data: IPermissions[],
    countDataOfMethods: CountDataOfMethods,
    namePer: string[],
    methods:string[]
}


export interface IRoles extends ShareResponse {
    name: string,
    value: string,
    status: boolean,
    permissions: string[],
    isCanDelete: boolean,
}
