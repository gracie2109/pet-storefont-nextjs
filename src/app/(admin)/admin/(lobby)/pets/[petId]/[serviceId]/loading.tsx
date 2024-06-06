import {Shell} from "@/components/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import {Skeleton} from "@/components/ui/skeleton";
import {DataTableSkeleton} from "@/components/data-tables/data-table-skeleton";
import * as React from "react";

export default function ServiceDetailLoading () {
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
            <div className=" mt-5">

                <div>
                    <DataTableSkeleton
                        columnCount={2}
                        rowCount={5}
                        isNewRowCreatable={false}
                        isRowsDeletable={false}
                        showFooter={false}
                        showHeader={false}
                    />
                </div>

            </div>
        </Shell>

    )
}