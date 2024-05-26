import {Skeleton} from "@/components/ui/skeleton";
import * as React from "react";
import {Card} from "@/components/ui/card";


export function CardSkeleton() {
    return (
        <Card className="h-92 border-none rounded-sm">

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
    )
}