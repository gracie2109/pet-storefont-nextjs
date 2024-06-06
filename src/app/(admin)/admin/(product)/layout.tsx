'use client';

import {ReactNode} from "react";
import * as React from "react";
import {useRouter} from "next/navigation";
import {AlertDialogC} from "@/components/alert-dialog-c"
import {Shell} from "@/components/shell";

export default function ProductLayout({children}: { children: ReactNode }) {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    return (
        <div className="relative">
            <div className="h-12 bg-gray-50 flex fixed z-20 w-full items-center justify-end pr-5 ">
                <div className="p-3 h-full cursor-pointer font-bold">
                    <p onClick={() => setOpen(true)}>X</p>
                    {open &&
                        <AlertDialogC
                            open={open}
                            setOpen={setOpen}
                            title={"Close this tab?"}
                            subtitle={"If you close this tab, your data not be save"}
                            okText={"Close"}
                            handleOk={() => router.push("/admin/products")}
                        />
                    }
                </div>
            </div>
            <div className="grid grid-cols-12 h-screen relative z-10 top-12">
               <div id="nav_bar_product" className="col-span-2  h-screen relative ">
                       <div className="content absolute top-0 w-full p-5 h-full bg-gray-300">
                           Show product tabs hear
                       </div>
               </div>
                <div className="h-screen relative p-5 w-full border border-gray-200 col-span-10 ">
                    {children}
                </div>
            </div>

        </div>
    )
}