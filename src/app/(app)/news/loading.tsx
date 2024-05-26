import {Shell} from "@/components/shell";
import {Skeleton} from "@/components/ui/skeleton";
import {CardSkeleton} from "@/components/cards/card-skeleton";
import * as React from "react";
import {Card} from "@/components/ui/card";

export default function NewsPageLoading() {
    return (
        <Shell>

            <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-[80px]" /> <span className="text-gray-400">/</span> <Skeleton className="h-4 w-[200px]" />
            </div>

            <div className="flex gap-6">
                <div className="w-1/4">
                    <div id="skeleton_filter" className="space-y-8">
                        <div id="skeleton_filter_search" className="space-y-3">
                            <Skeleton className="h-4 w-[50px]"/>
                            <Skeleton className="h-8 w-full"/>
                        </div>

                        <div id="skeleton_filter_checkbox" className="space-y-3">
                            <Skeleton className="h-4 w-[50px]"/>

                            {Array.from({length: 6}).map((_, i) => (
                                <div className="flex items-center gap-3" key={i}>
                                    <Skeleton className="h-6 w-6"/>
                                    <Skeleton className="h-6 w-full"/>
                                </div>
                            ))}


                        </div>


                    </div>
                </div>
                <div className="flex-1">
                    <div className="grid grid-cols-3 gap-3">
                        {Array.from({length: 6}).map((_, i) => (
                            <Card className="h-2 border-none rounded-sm">

                                <div className="grid place-items-center">
                                    <Skeleton className="h-36 w-full"/>
                                </div>
                                <div className="px-6 py-4 space-y-2">
                                    <Skeleton className="h-8 w-full"/>
                                    <Skeleton className="h-16 w-full"/>
                                    <div className="tags_render_card flex items-center gap-3">
                                        {Array.from({length: 3}).map((_, i) => (
                                            <Skeleton className="h-6 w-1/3 bg-gray-200" key={i}/>
                                        ))}

                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                    <div className="grid place-items-center mt-5">
                        <Skeleton className="h-12 w-[120px] mt-5 " />
                    </div>



                </div>

            </div>


        </Shell>
    )
}