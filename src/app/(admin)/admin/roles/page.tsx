
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import {Shell} from "@/components/shell";
import {RolesShell} from "@/components/shells/roles-shell";
import {getListRoles} from "@/api-requests/roles";

export default async function RolesPage() {
    const data = await getListRoles()

    return (
        <Shell variant="sidebar">
            <PageHeaderShell separated >
                <PageHeader>
                    <PageHeaderHeading size="sm">Roles</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        Manage your roles
                    </PageHeaderDescription>
                </PageHeader>
            </PageHeaderShell>
            <RolesShell data={data} />
        </Shell>
    )
}