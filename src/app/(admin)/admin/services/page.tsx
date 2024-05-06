
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import {Shell} from "@/components/shell";
import {ServicesShell} from "@/components/shells/services-shell";
import {getListServices} from "@/api-requests/services";

export default async function ServicePage() {
    const result = await getListServices();

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
             {result.status == 200 && <ServicesShell data={result?.payload?.data} pets={result?.payload?.pets}/>}
        </Shell>
    )
}