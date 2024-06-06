import {Shell} from "@/components/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import Link from "next/link";
import {CategoriesTree} from "@/components/categories-tree";
import {getListCategories} from "@/api-requests/categories";
import * as React from "react";

import {ResultPageNotification} from "@/components/result-page-notification";
export default async function CategoriesPage() {
    const data = await getListCategories();
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

            <Link href="/admin/category/create">
                Create news
            </Link>
            {data.status == 200 ?
                <React.Fragment>
                    <CategoriesTree data={data.payload.data}/>
                </React.Fragment>
                : (
                    <ResultPageNotification
                        status="404"
                        title="Something went wrong!"
                        subtitle={"please try again"}
                    >
                        <></>
                    </ResultPageNotification>
                )}
            =
        </Shell>
    )
}