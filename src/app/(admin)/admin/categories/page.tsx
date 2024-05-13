import {Shell} from "@/components/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import Link from "next/link";


export default  function CategoriesPage(){
    return (
        <Shell variant="sidebar">
            <PageHeaderShell separated >
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
        </Shell>
    )
}