import {Shell} from "@/components/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import {BackLink} from "@/components/back-link";
import * as React from "react";


export default function BrandProductPage () {
    const products =null as any
    return (
        <Shell variant="sidebar">
            <PageHeaderShell separated>
                <PageHeader>
                    <PageHeaderHeading
                        size="sm">Product of brand</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                       List product of brands
                    </PageHeaderDescription>
                </PageHeader>
                <BackLink href="/admin/brands" />
            </PageHeaderShell>

            {!products ? (
                <React.Fragment>
                    <h3>Not found products yet.</h3>
                    <div>
                        Add product herer
                    </div>
                </React.Fragment>
            ):(
                <p>Show table</p>
            )}
        </Shell>
    )
}