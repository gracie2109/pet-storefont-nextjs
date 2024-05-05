import {ShareResponse} from "@/types/index";
import {IPets} from "@/types/pets";

export interface IService extends ShareResponse {
    name:string,
    status:boolean,
    desc:string,
    minTimeToDo:string,
    total_service_of_pet:number
}


export type IServiceFetchResponse  = {
    data:IService[],
    pets:IPets[]
}