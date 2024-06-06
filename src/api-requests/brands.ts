'use server';
import http from "@/configs/http"
import {endPoint} from "@/configs/endpoint";
import {revalidateTag,} from "next/cache";
import {router} from "next/client";
import {en} from "suneditor/src/lang";


export const createBrands = async(payload:any) => {
    try {
       const data = await http.post(endPoint.createNewBrand,payload,{
            next: {cache: 'no-store'}
        })
        if (data.status == 200) {
            revalidateTag('brands')
        }
    }catch (err){
        console.log(err);

    }
}



export const getDetailBrands = async(brandId:string) => {
    if(!brandId || brandId ==="create") return
    return await http.get(`${endPoint.getDetailBrands}/${brandId}`, {
        next: {tags: [`post/${brandId}`]}
    });

}

export const getListBrands = async() => {
    return http.get(`${endPoint.getListBrands}`, {
        next: {tags: ['brands'], revalidate: 720}
    });
}

export const updateBrand = async (payload:any) => {
    if (!(payload || payload?.id)) return
    const data = await http.patch(`${endPoint.updateBrand}`, payload,{
        next: {cache: 'no-store'}
    })
    if (data.status == 200) {
        revalidateTag('brands');
         revalidateTag(`post/${payload.id}`)
    }
}