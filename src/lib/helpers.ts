'use client';


import {useSearchParams} from "next/navigation";
import {UseFormReturn} from "react-hook-form";
import {IPermissions} from "@/types/roles";
import {SelectOptions} from "@/types";
import {UploadBeforeHandler, UploadBeforeReturn} from "suneditor-react/dist/types/upload";
import {uploadFiles} from "@/lib/utils";

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

export function convertToVietnamTime(minutes: number, mode: "single" | "string", showHour: boolean = true): any {

    if(!minutes) return '0m';

    let hours: number = Math.floor(minutes / 60);
    minutes %= 60;
    if (minutes <= 60 && mode === "single") return hours + minutes / 60;
    if (hours >= 24) hours -= 24;
    if (mode === "string" && showHour) {
        if (hours == 0) {
            return `${minutes}m`;
        }
        return `${hours}h${minutes}m`;
    } else {
        return {hours, minutes};
    }
}



interface GroupedData {
    [key: string]: IPermissions[];
}

interface ResponseItem {
    [key: string]: IPermissions[];
}

export function groupByPermissions(data: IPermissions[]): ResponseItem[] {
    const response: ResponseItem[] = [];
    const groupedData: GroupedData = {};
    if (!data) return [];

    data.forEach((item) => {
        const permissionName = item.name.split('.')[1];
        const perName = item.name.split('.')[2];
        if (!groupedData[permissionName]) {// @ts-ignore
            groupedData[permissionName] = new Set<string>();
        }// @ts-ignore
        groupedData[permissionName].add(perName);
    });

    const allPerNames = new Set<string>();
    for (const permissionName in groupedData) {
        for (const perName of groupedData[permissionName]) {
            // @ts-ignore
            allPerNames.add(perName);
        }
    }

    const sortedPerNames = Array.from(allPerNames);

    for (const permissionName in groupedData) {
        const permissionArray: (string | null)[] = [];
        for (const perName of sortedPerNames) {// @ts-ignore
            permissionArray.push(groupedData[permissionName].has(perName) ? perName : null);
        }
        const permissionItemArray = permissionArray.map((perName) => {
            const foundItem = data.find((item) => item.name.split('.')[1] === permissionName && item.name.split('.')[2] === perName);
            const newItem = {...foundItem, indentity: permissionName}
            return foundItem ? newItem : null;
        });// @ts-ignore
        // @ts-ignore
        const permissionObject: ResponseItem = {
            // @ts-ignore
            [permissionName]: permissionItemArray,

        };
        response.push(permissionObject);
    }

    return response;
}

export const getQuantityOfPermission = (data:any[]) => {
    if(!data) return null;
    const dataname = data?.map((i) =>i.name?.split('.')?.at(-1));
    return dataname.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});
}
export function matchingTwoObject(obj1: any, ob2: any): any[] {
    const matchingKeys = [];
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(ob2);

    for (const key of keys1) {
        if (keys2.includes(key) && obj1[key] === ob2[key]) {
            matchingKeys.push(key);
        }
    }
    return matchingKeys;
}





export function getUniquePermissions(array1:any, array2:any) {
    const setA = new Set(array1.map((item:any) => item._id));
    const uniqueElements = array2.filter((item:any) => {
        if (!setA.has(item._id)) {
            setA.add(item.name);
            return item;
        }
    });

    return uniqueElements;
}
export function formatPrice(
    price: number | string,
    options: {
        currency?: "USD" | "EUR" | "GBP" | "BDT" | "VND"
        notation?: Intl.NumberFormatOptions["notation"]
    } = {}
) {
    const {currency = "VND", notation = "standard"} = options
    if (price == "undefined") return
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency,
        notation,
    }).format(Number(price))
}

interface InputObject {
    [key: string]: any;
}


export function convertSettingPriceOfServiceData(inputObj: InputObject, raw?: any[]) {
    const outputArray: any[] = [];
    for (const key in inputObj) {
        const value = isNaN(inputObj[key]) ? "undefined" : Number(inputObj[key]);
        const rawObject = raw && raw?.find(obj => obj.weightId._id === key);
        if (rawObject) {
            const obj: any = {
                weightId: key,
                price: value,
                id: rawObject.id
            };
            outputArray.push(obj);
        } else {
            const obj: any = {
                weightId: key,
                price: value,
            };
            outputArray.push(obj);
        }
    }
    return outputArray;
}

export function modifySelectValue(input: string[]): SelectOptions[] {
    const response = [] as SelectOptions[]
    input.map((item) => {
        response.push({
            label: item,
            value: item
        })
    });

    return response;
}


export function formatBytes(
    bytes: number,
    decimals = 0,
    sizeType: "accurate" | "normal" = "normal"
) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"]
    if (bytes === 0) return "0 Byte"
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
        sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
    }`
}

export function isArrayOfFile(files: unknown): files is File[] {
    const isArray = Array.isArray(files)
    if (!isArray) return false
    return files.every((file) => file instanceof File)
}


export function onImageUploadBeforeSunEdior(folder: string) {
    // @ts-ignore
    return (files: File[], info: object, uploadHandler: UploadBeforeHandler): UploadBeforeReturn => {
        (async () => {
            const data = await uploadFiles(files, folder);
            const res = {
                result: [
                    {
                        url: data?.[0]?.url,
                        name: "thumbnail",
                    },
                ],
            } as any;

            uploadHandler(res);
        })();
        uploadHandler();
    };
}


export function generateServiceTimeRow(pets:any[], weights:any[]) {
    if(!(pets || !weights)) return null;
    return pets.map(pet => {
        const weightData = weights.reduce((acc, weight) => {
            acc[weight._id] = { value: null };
            return acc;
        }, {});
        return { [pet._id]: weightData };
    });
}