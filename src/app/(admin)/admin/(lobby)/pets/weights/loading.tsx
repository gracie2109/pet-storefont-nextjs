import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import {Shell} from "@/components/shell";
import * as React from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {DataTableSkeleton} from "@/components/data-tables/data-table-skeleton";


export default async function PetWeightsLoadingPages() {


    return (
        <Shell variant="sidebar">
            <PageHeaderShell separated>
                <PageHeader>
                    <PageHeaderHeading size="sm">
                        <Skeleton className="h-4 w-40"/>
                    </PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        <Skeleton className="h-4 w-96 "/>
                    </PageHeaderDescription>
                </PageHeader>

            </PageHeaderShell>
            <DataTableSkeleton
                columnCount={2}
                rowCount={5}
                isNewRowCreatable={false}
            />
        </Shell>
    )
}