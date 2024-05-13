import {Shell} from "@/components/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import { NewsHandleTemplate} from "@/components/handle-templates/news";
import {BackLink} from "@/components/back-link";


interface Params {
    params: { id: string; }
}
export default function NewsHandlePage({ params }: Params) {

    return (
        <Shell variant="sidebar" className="overflow-x-hidden">
            <PageHeaderShell separated>
                <PageHeader>
                    <PageHeaderHeading size="sm">NewsHandlePage</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        {params.id !== "create" ? "Edit News" : "Create new post"}
                    </PageHeaderDescription>
                </PageHeader>
                <BackLink href="/admin/news"/>
            </PageHeaderShell>
            <NewsHandleTemplate params={params.id}/>
        </Shell>
    )
}