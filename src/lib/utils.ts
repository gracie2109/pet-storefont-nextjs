import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {FileWithPreview, IImagesFile} from "@/types";
import {undefined} from "zod";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export const uploadFiles = async (files: File[], folder: string) => {
    const response = [] as any[]
    const formData = new FormData();
    for (let i of files) {
        formData.append("file", i);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
        formData.append("folder", folder);
        const {data} = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`, formData);
        const result = {
            url: data.secure_url,
            public_id: data.public_id,
            folder: data.folder,
            asset_id: data.asset_id,
            name: data.original_filename,
            width: data.width,
            height: data.height,

        }
        response.push(result)
    }
    return response;
}


export const convertImageServerToPreview = (file: IImagesFile[] | undefined):null | FileWithPreview[] => {
    const convertImages: FileWithPreview[]  = [];

    if (!file) return null;

    for (const i of file) {
        convertImages.push({
            preview: i.url,
            url: i.url,
            name: i.name,
            lastModified: 0,
            webkitRelativePath: "",
            size: 0,
            type: "",

            arrayBuffer: function (): Promise<ArrayBuffer> {
                throw new Error("Function not implemented.");
            },
            slice: function (start?: number | undefined, end?: number | undefined, contentType?: string | undefined): Blob {
                throw new Error("Function not implemented.");
            },
            stream: function (): ReadableStream<Uint8Array> {
                throw new Error("Function not implemented.");
            },
            text: function (): Promise<string> {
                throw new Error("Function not implemented.");
            }
        })
    }


    return convertImages
}


export function truncate(str: string, length: number) {
    return str.length > length ? `${str.substring(0, length)}...` : str
}

export function toTitleCase(str: string) {
    return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
    )
}