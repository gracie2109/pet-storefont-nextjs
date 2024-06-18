'use client'
import React, {ReactNode} from "react";
import {Shell} from "@/components/shell";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {useSelectedLayoutSegments} from "next/navigation";
import clsx from "clsx";
import {motion} from "framer-motion"
const sampleRole = ['admin', 'cashier', 'test','super admin'];



const tabsLink = [
    {
        name: "General",
        href:"/",
        special: true
    },
    {
        name: "Security",
        href:"security"
    },
    {
        name: "Transaction",
        href:"transaction"
    }
]

export default function ProfileLayout({children}: {children: ReactNode}) {
    const [noLayout, setNoLayout] = React.useState<boolean>(false);
    const segment = useSelectedLayoutSegments();
    const showSegment = React.useMemo(() => {
        if(segment.length === 3 && segment[1] === "transaction") return true
    },[segment])


    return (
        <div>
            <Shell variant="sidebar">
                <div className={clsx("grid 2xl:grid-cols-5 gap-3 h-screen relative  will-change-auto", {
                    "hidden": showSegment
                })}>
                    <div className="col-span-1  border-r-4 border-primary-foreground">
                        <Shell variant="markdown">
                            <div className="grid place-items-center gap-5">
                                <div className="w-40 h-40 rounded-full border-4 border-primary">
                                    <div className="w-full h-full p-5 rounded-full relative">
                                        <Image
                                            src={"https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"}
                                            alt="Picture of the author"
                                            fill
                                            sizes="(max-width: 768px) 100vh, (max-width: 1200px) 50vh, 33vh"
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </div>
                                </div>

                                <div className="text-center space-y-4">
                                    <b>@gracie2109</b>
                                    <p>thaotp2109@gmail.com</p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {sampleRole.map((i, j) => <Badge key={j} variant="green">{i}</Badge>)}
                                </div>
                            </div>
                            <Separator/>
                            <div id="user_general" className="space-y-3">
                                <div><b className="text-sm">User Name:</b> <span>Gracie</span></div>
                                <div><b className="text-sm">Full Name:</b> <span>Trịnh Phương Thảo</span></div>
                                <div><b className="text-sm">Email:</b> <span>thaotp2109@gmail.com</span></div>
                                <div><b className="text-sm">Address:</b> <span>NAN</span></div>
                                <div><b className="text-sm">Phone:</b> <span>012345678</span></div>
                            </div>
                        </Shell>
                    </div>
                    <div className="2xl:col-span-4">
                        <div className={"flex gap-3 items-center bg-slate-50 h-12"}>
                            {tabsLink.map((i) => <Link href={`/profile/${i.href}`} key={i.name}
                                                       className={clsx("capitalize font-bold ", {
                                                           "text-red-600": segment.includes(i.href) || (segment.length === 1 && i.hasOwnProperty("special")),
                                                       })}

                            >{i.name}</Link>)}
                        </div>

                        <motion.div className="realative w-full h-screen">
                            {children}
                        </motion.div>

                    </div>

                </div>

                <div className={clsx({"hidden": !showSegment})}>
                    {children}
                </div>


            </Shell>
        </div>
    )
}