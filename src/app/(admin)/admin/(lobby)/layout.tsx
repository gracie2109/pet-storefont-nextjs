import {ReactNode} from "react";
import {AppLayoutTemplate} from "@/layouts";

export default function AdminLayout({children}: { children: ReactNode }) {
    return (
        <AppLayoutTemplate>
            {children}
        </AppLayoutTemplate>
    )

}