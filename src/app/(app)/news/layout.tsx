import * as React from "react";
import {toTitleCase} from "@/lib/utils";
import {Breadcrumbs} from "@/components/breadcrumb";

export default function NewsLayout({children}: {children: React.ReactNode}) {
    return (
        <React.Fragment>
            <div className="relative">
                {children}
            </div>
        </React.Fragment>
    )
}