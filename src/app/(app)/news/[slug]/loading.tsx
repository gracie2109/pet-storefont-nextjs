import {Shell} from "@/components/shell";
import {Skeleton} from "@/components/ui/skeleton";
import {Card} from "@/components/ui/card";
import * as React from "react";

export default function PageNewDetailLoading() {
    return (
        <Shell variant="sidebar" className="relative">
            <div className="relative left-7 ml-2">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-[80px]"/> <span className="text-gray-400">/</span> <Skeleton
                    className="h-4 w-[200px]"/>
                </div>
            </div>
            <div className="flex gap-6">
                <div className="flex-1">
                    <Shell variant="default">
                        <div className="p-2 h-screen">
                            <Skeleton className="h-16 w-full mb-5"/>
                            <Skeleton className="h-80 w-full mb-5"/>
                            <Skeleton className="h-20 w-full rounded aspect-video"/>
                            <Skeleton className="h-64 w-full my-3"/>
                        </div>
                    </Shell>
                </div>
                <div className="w-1/3 space-y-8">
                    <div id="skeleton_filter" className="space-y-8">
                        <div id="skeleton_filter_search" className="space-y-3">
                            <Skeleton className="h-8 w-[150px]"/>
                            <div className="tags_render_card grid grid-cols-4  gap-3 w-full">
                                {Array.from({length: 7}).map((_, i) => (
                                    <Skeleton className="h-6 bg-gray-200" key={i}/>
                                ))}
                            </div>
                        </div>

                        <div id="skeleton_filter_checkbox" className="space-y-3">
                            <Skeleton className="h-8 w-[150px]"/>

                            <div className="grid grid-cols-2 gap-3">
                                {Array.from({length: 4}).map((_, i) => (
                                    <Card key={i} className="h-44 space-y-4 ">
                                        <Skeleton className="h-28 " key={i}/>
                                        <Skeleton className="h-12" key={i}/>
                                    </Card>
                                ))}
                            </div>


                        </div>
                    </div>



                </div>
            </div>

        </Shell>
    )
}