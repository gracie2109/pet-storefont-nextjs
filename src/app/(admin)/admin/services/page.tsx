import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import {Shell} from "@/components/shell";
import {ServicesShell} from "@/components/shells/services-shell";
import {getListServices} from "@/api-requests/services";

export default async function ServicePage() {
    const data = await getListServices();
    return (
        <Shell variant="sidebar">
            <PageHeaderShell separated >
                <PageHeader>
                    <PageHeaderHeading size="sm">Services</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        Manage your services
                    </PageHeaderDescription>
                </PageHeader>

            </PageHeaderShell>
            {data && <ServicesShell  data={data.data} pets={data.pets} status={false}/>}
        </Shell>
    )
}