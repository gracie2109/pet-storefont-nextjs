import {Shell} from "@/components/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header"
import {CustomersShell} from "@/components/shells/customers-shell"
import {getListCustomers} from "@/api-requests/customers";
import {ResultPageNotification} from "@/components/result-page-notification";
import * as React from "react";


export default async function PageUsers() {
    const data = await getListCustomers();

    return (
        <Shell>
            <PageHeaderShell separated>
                <PageHeader>
                    <PageHeaderHeading size="sm">Customers</PageHeaderHeading>
                    <PageHeaderDescription size="sm">All own customers</PageHeaderDescription>
                </PageHeader>
            </PageHeaderShell>

            {data.status !== 200 ? (
                <ResultPageNotification
                    status={"404"}
                    title={"Get list customers error"}
                    subtitle={data?.payload?.message || "Something went wrong!"}
                >
                    <></>
                </ResultPageNotification>
            ) : (<CustomersShell data={data.payload.data}/>)}

        </Shell>
    )
}