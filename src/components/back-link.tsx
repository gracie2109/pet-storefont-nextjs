import Link from "next/link";
import * as React from "react";
import {cn} from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    href: string;
    backText?:string
}

export function BackLink({href, className, backText}: Props) {
    return (
        <Link href={href} className={cn("flex items-center gap-3 hover:text-gray-400", className)}>
            {backText ? backText : "Back"}
        </Link>
    )
}