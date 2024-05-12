
import {CardContent} from "@/components/ui/card";
import {clsx} from "clsx";
import {ArrowRight, Check} from "lucide-react";
import {Button} from "@/components/ui/button";
import React from "react";
import {usePathname, useRouter} from "next/navigation";

export function ServicesCard({isActive, data}: any) {
    const route = useRouter();
    const pathname = usePathname();
    return (
        <>
            <CardContent className="grid gap-4 cursor-pointer "
            >
                <div className={
                    clsx(" flex items-center space-x-4 rounded-md p-6 border ", {
                        "border-orange-400": isActive,
                         "bg-slate-100":!data.status
                    })
                }>
                    {isActive && <Check className={clsx("", {"text-slate-300": !data.status})}/>}
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {data?.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {data?.desc}/{data?.status ? "active" : "inactive"}
                        </p>
                    </div>
                    <Button variant="secondary" disabled={!data.status}
                            onClick={() => {
                                route.push(`${pathname}/${data?._id}`)
                            }}>
                        {/*{serviceSpin ? "Loading" : "GO"}*/}
                        <ArrowRight className="ml-2 h-4 w-4 "/>
                    </Button>
                </div>

            </CardContent></>
    )
}