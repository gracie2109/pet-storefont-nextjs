'use client';

import {ProductShellLayout} from "@/components/shells/product-shell-layout";
import * as React from "react";


export function ProductShell({data}:{data:any}) {
    const [mode, setMode] = React.useState("")
    return (
        <ProductShellLayout mode={mode}>

            This is content of product shell layout


        </ProductShellLayout>
    )
}