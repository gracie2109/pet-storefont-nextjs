import {FileWithPreview} from "@/types";
import http from "@/configs/http";
import {endPoint} from "@/configs/endpoint";


const convertBase64 = (file: FileWithPreview) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

export const uploadFile = async (files: FileWithPreview[]) => {
    if (!files) return;

    try {
        const data = await http.post(endPoint.uploadAsset, files, {
            cache: "no-store"
        });

        return data
    } catch (error) {
        console.log("client upload fail", error)
    }

}