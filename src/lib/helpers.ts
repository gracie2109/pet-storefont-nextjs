'use client';



import {useSearchParams} from "next/navigation";
import {UseFormReturn} from "react-hook-form";

export const useQueryString = () => {
    const searchParams = useSearchParams();
    const params = Object.fromEntries(searchParams) as any
    return {
        params: params,
        size: searchParams.size
    };
};


export function toSentenceCase(str: string) {
    return str
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
}



export const setValuesOfForm = (data: any, form: UseFormReturn<any>) => {
    Object.keys(data).forEach(key => {
        form.setValue(key, data[key]);
    });
};