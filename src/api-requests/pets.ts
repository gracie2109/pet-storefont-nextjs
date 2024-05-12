'use server'

import http from "@/configs/http"
import {endPoint} from "@/configs/endpoint";
import {revalidateTag,} from "next/cache";
import {router} from "next/client";


export const getListPets = async () => {
    const data = await http.get(endPoint.getListPet, {
        next: {tags: ['pets'], revalidate: 3600},

    });
    return data
}


export const createNewPet = async (input: any) => {
    const data = await http.post(endPoint.createPet, input);
    if (data.status == 200) {
        return revalidateTag('pets')
    }
    return data.payload
}


export const deletePet = async (input: string) => {
    if (!input) return
    const data = await http.delete(`${endPoint.deletePet}/${input}`, {
        cache: 'no-store'
    });
    if (data.status == 200) {
        return revalidateTag('pets')
    }
    return data.payload
}


export const updatePet = async (input: any) => {
    const data = await http.patch(endPoint.updatePet, input, {
        cache: 'no-store'
    });
    if (data.status == 200) {
        return revalidateTag('pets')
    }
    return data.payload
}


export const getServiceOfPet = async (petId: string) => {
    const data = await http.get(`${endPoint.serviceOfPet}/${petId}`, {
        next: {
            tags: [`pets/${petId}`],
        },
        cache: 'no-cache'
    })
    return data
}


export const getListPetWeight = async () => {
    const data = await http.get(endPoint.getListPetWeight, {
        next: {
            tags: ['pets-weight']
        }
    })
    return data
}

export const setPriceForService = async (input: any) => {
    const data = await http.post(endPoint.setServicePriceForPet, input,{
        cache: 'no-store'
    });
    if (data.status == 200) {
        return revalidateTag(`pets/${input.petId}`)
    }
    return data
}

export const updatePrice = async (input: any, petId:string) => {
    const data = await http.patch(endPoint.updatePriceOfService, input,{
        cache: 'no-store'
    });
    if (data.status == 200){
        return revalidateTag(`pets/${petId}`)
    }
    return data
}