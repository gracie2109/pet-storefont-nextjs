import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import {Shell} from "@/components/shell";
import Link from "next/link";
import * as React from "react";
import {ResultPageNotification} from "@/components/result-page-notification";
import {Button} from "@/components/ui/button";
import {getDetailRoles, getPermissions} from "@/api-requests/roles";
import {RoleHandleTemplate} from "@/components/handle-templates/roles";
import {BackLink} from "@/components/back-link";


interface IParams {
    params: {
        id: string
    }
}

export default async function RoleHandlePage({params}: IParams) {
    const response = await getDetailRoles(params?.id.toString());
    const permissions = await getPermissions();
    return (
        <Shell variant="sidebar">
            <PageHeaderShell separated>
                <PageHeader>
                    <PageHeaderHeading
                        size="sm">Role {params.id === "create" ? "New" : "Detail"}</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        {params.id === "create" ? "Create new role" : "Edit role"}
                    </PageHeaderDescription>
                </PageHeader>
               <BackLink href="/admin/roles" />
            </PageHeaderShell>
            {params.id.toString() === "create" ?
                <RoleHandleTemplate params={params.id.toString()} permissions={permissions}/> : (
                    <React.Fragment>
                        {(response?.status !== 200 || !response.payload.data) ? (
                                <ResultPageNotification
                                    status="404"
                                    title="Something went wrong!"
                                    subtitle={response?.payload?.error ?? ""}
                                >
                                    <Link href="/admin/roles/create">
                                        <Button size="sm">
                                            Create new
                                        </Button>
                                    </Link>
                                </ResultPageNotification>
                            ) :
                            <RoleHandleTemplate
                                params={params.id.toString()}
                                data={response?.payload?.data}
                                permissions={permissions}
                            />
                        }
                    </React.Fragment>
                )
            }
        </Shell>
    )
}