import * as React from 'react';
import {Shell} from "@/components/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import Link from "next/link";
import {CategoryHandleTemplate} from "@/components/handle-templates/category";

interface Params {
    params: {
        id: string
    }
}
export default function CategoryHandlePage({params}: Params) {
    return (
        <Shell variant="sidebar">
            <PageHeaderShell separated>
                <PageHeader>
                    <PageHeaderHeading size="sm">Categories</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        Manage your categories
                    </PageHeaderDescription>
                </PageHeader>
            </PageHeaderShell>
            <CategoryHandleTemplate/>
        </Shell>
    )
}