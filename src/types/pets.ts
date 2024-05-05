import {ShareResponse} from "@/types/index";

export interface IPets  extends ShareResponse {
    name:string,
    status:boolean,
    icon:string,
    totalServiceOfPet:number
}