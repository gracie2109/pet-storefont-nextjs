import React from "react";
import {Icons} from "@/components/icons";
import {clsx} from  "clsx";

interface ResultPageNotification {
    title: React.ReactNode,
    subtitle: React.ReactNode,
    status:"success" | "error" | "info" | "warning" | "404" | "403" | "500",
    children:React.ReactNode,

}
export function  ResultPageNotification (props:ResultPageNotification) {
    const modifyName =  `prs_${props.status}` as string

    // @ts-ignore
    const ImageByStatus = modifyName ? Icons[modifyName] : Icons["prs_info"]
    return (
        <div className={clsx("w-full h-full space-y-6  grid place-items-center")}>
            <div id="page_result_status">
                <ImageByStatus className="w-[256px] h-[294px]"/>
            </div>
            <div className="space-y-2 text-center">
                <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">

                    {props.title}
                </h2>
                <small className="text-sm font-medium leading-none">   {props.subtitle}</small>
            </div>
            <div>
                {props.children}
            </div>
        </div>
    )
}