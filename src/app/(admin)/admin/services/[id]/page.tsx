import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import {Shell} from "@/components/shell";
import Link from "next/link";
import {ServiceHandleTemplate} from "@/components/handle-templates/services";
import * as React from "react";
import {getDetailService} from "@/api-requests/services";
import {ResultPageNotification} from "@/components/result-page-notification";
import {Button} from "@/components/ui/button";


interface IParams {
    params: {
        id: string
    }
}

export default async function ServiceHandlePage({params}: IParams) {
    const response = await getDetailService(params?.id.toString())
    return (
        <Shell variant="sidebar">
            <PageHeaderShell separated>
                <PageHeader>
                    <PageHeaderHeading
                        size="sm">Services {params.id === "create" ? "New" : "Detail"}</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        {params.id === "create" ? "Create new service" : "Edit service"}
                    </PageHeaderDescription>
                </PageHeader>
                <Link href="/admin/services" className="hover:text-gray-400">Back</Link>
            </PageHeaderShell>
            {params.id == "create" ?
                <ServiceHandleTemplate params={params.id.toString()}/> : (
                    <React.Fragment>
                        {response?.status !== 200 ? (
                                <ResultPageNotification
                                    status="404"
                                    title="Something went wrong!"
                                    subtitle={response?.payload?.error ?? ""}
                                >
                                    <Link href="/admin/services/create">
                                        <Button size="sm">
                                            Create new
                                        </Button>
                                    </Link>
                                </ResultPageNotification>
                            ) :
                            <ServiceHandleTemplate params={params.id.toString()} data={response?.payload?.data}/>
                        }
                    </React.Fragment>
                )
            }
        </Shell>
    )
}