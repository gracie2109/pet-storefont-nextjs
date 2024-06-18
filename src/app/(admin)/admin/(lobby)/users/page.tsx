import {Shell} from "@/components/shell";
import {PageHeaderShell, PageHeaderHeading, PageHeaderDescription, PageHeader} from "@/components/page-header";
import {CustomersShell} from "@/components/shells/customers-shell"
import {getListCustomers} from "@/api-requests/customers";


export default  async function UsersManagerPage () {
    const {payload} = await getListCustomers()
    return (
        <Shell>
            <PageHeaderShell>
                <PageHeader>
                    <PageHeaderHeading>
                        Users
                    </PageHeaderHeading>
                    <PageHeaderDescription>All the customers and employee we have</PageHeaderDescription>
                </PageHeader>
            </PageHeaderShell>

            <CustomersShell data={payload.data || []} />
        </Shell>
    )
}