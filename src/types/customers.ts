import {ShareResponse} from "@/types/index";

export interface ICustomers  extends ShareResponse {
    email:string,
    username:string,
    images:[],
    isVerified:boolean,
    socials:[],
    status:string,
    employeeStatus:boolean,
    roles: string[],

}