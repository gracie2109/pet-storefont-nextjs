import {Shell} from "@/components/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import Link from "next/link";
import {getListPost} from "@/api-requests/news";


export default async function NewsPage(){
    const data = await getListPost();
    console.log("NewsPage", data);
    return (
        <Shell variant="sidebar">
            <PageHeaderShell separated >
                <PageHeader>
                    <PageHeaderHeading size="sm">News</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        Manage your news
                    </PageHeaderDescription>
                </PageHeader>
            </PageHeaderShell>

            <Link href="/admin/news/create">
                Create news
            </Link>
        </Shell>
    )
}