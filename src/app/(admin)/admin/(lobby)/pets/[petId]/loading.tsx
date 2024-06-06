import {Shell} from "@/components/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import * as React from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {DataTableSkeleton} from "@/components/data-tables/data-table-skeleton";

export default function PetDetailLoading() {
    return (
        <Shell variant="default" as="div">
            <PageHeaderShell separated>
                <PageHeader className="flex-1">
                    <PageHeaderHeading size="sm">
                        <Skeleton className="h-4 w-40"/>
                    </PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        <Skeleton className="h-4 w-96 "/>
                    </PageHeaderDescription>
                </PageHeader>
                <Skeleton className="h-4 w-20 "/>
            </PageHeaderShell>
            <div className="space-y-3 mt-5">
                <div className="grid grid-cols-3 gap-3">
                    {Array(6).fill(null).map((_, i) => (
                        <Skeleton className="h-[87px] " key={i}/>
                    ))}
                </div>
                <div>
                    <DataTableSkeleton columnCount={3}/>
                </div>

            </div>
        </Shell>
    )
}