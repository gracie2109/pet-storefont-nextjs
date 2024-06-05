'use client';

import * as React from "react";
import {siteConfig} from "@/configs/site-config";
import {Tree} from "@/components/tree-select";
import Link from "next/link";
import {ScrollArea} from "@/components/ui/scroll-area";


interface IAppLayoutTemplate {
    children: React.ReactNode;
}


export function AppLayoutTemplate({children}: IAppLayoutTemplate) {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="relative ">
            <div className="petshop_header bg-gray-200 h-14 w-screen top-0 sticky z-40">
                Header
            </div>
            <div className="flex w-full h-screen  z-20">
                <div className="relative h-full">
                    <div className="h-screen  relative w-[200px] ">
                        <div className="layout_navigation  space-y-3 p-3 relative">
                            {siteConfig.adminNavigation.map((i, j) => (
                                <div key={j}>
                                    <Link href={i.href}>
                                        {i.title}
                                    </Link>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

                <div className="petshop_content flex-1 relative w-full z-30 top-5">
                    {children}
                </div>
            </div>
        </div>
    )
}