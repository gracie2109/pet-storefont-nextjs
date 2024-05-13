import {SelectOptions, ShareResponse} from "@/types/index";

export interface INews extends ShareResponse {
    name: string,
    images:any,
    tags:SelectOptions[],
    preview:string,
    content:any,
    status:boolean,
    slug:string,
}