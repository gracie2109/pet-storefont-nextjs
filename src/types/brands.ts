import {ShareResponse} from "@/types/index";

export interface IBrands extends ShareResponse {
    name: string,
    desc: string,
    status: boolean,
    images: string,
    slug: string,
}
