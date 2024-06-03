import {fetchPost} from '@/store/users.store';
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import {ServicesShell} from "@/components/shells/services-shell";
import {Shell} from "@/components/shell";


export default async function TestPage() {
    const initialPost = await fetchPost();
    return (
        <Shell variant="sidebar">
            <PageHeaderShell separated>
                <PageHeader>
                    <PageHeaderHeading size="sm">Page Tt</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        Page Tt
                    </PageHeaderDescription>
                </PageHeader>

            </PageHeaderShell>

            <ServicesShell status={initialPost.status} data={initialPost?.payload?.data}
                           pets={initialPost?.payload?.pets}/>
        </Shell>
    )
}