import {Shell} from "@/components/shell";
import {PageHeaderShell, PageHeaderHeading, PageHeaderDescription, PageHeader} from "@/components/page-header";
import {getDetailUser} from "@/api-requests/customers";
import {ResultPageNotification} from "@/components/result-page-notification";
import Link from "next/link";
import {getListRoles} from "@/api-requests/roles";
import {UserHandlePage} from "@/components/handle-templates/user";

interface Params {
    params: { id: string; }
}
export default  async function UsersManagerPage ({params}: Params) {
    const  user = await getDetailUser(params.id.toString());
    const roles= await getListRoles();

 const renderComp = () => {
    if(params.id === 'create') return <UserHandlePage  roles={roles} params={params.id.toString()} />;
    if(params.id !== "create") {
        if(user?.status == 200 && roles) return <UserHandlePage  roles={roles} userSelected={user.payload.data} params={params.id.toString()} />
        else return (<ResultPageNotification
            title={"Something went wrong"}
            subtitle={user?.payload?.message ?? user?.payload?.error}
            status={"404"}
        >
            <></>
        </ResultPageNotification>)
    }
 }

    return (
        <Shell>
            <PageHeaderShell>
                <PageHeader>
                    <PageHeaderHeading>
                        Users
                    </PageHeaderHeading>
                    <PageHeaderDescription>All the customers and employee we have</PageHeaderDescription>
                </PageHeader>
                <Link href="/admin/users">Back</Link>
            </PageHeaderShell>
            {renderComp()}
        </Shell>
    )
}