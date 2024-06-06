import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import {Shell} from "@/components/shell";
import Link from "next/link";
import * as React from "react";
import {ResultPageNotification} from "@/components/result-page-notification";
import {Button} from "@/components/ui/button";
import {BackLink} from "@/components/back-link";
import {getDetailBrands} from "@/api-requests/brands";
import {BrandHandleTemplate} from "@/components/handle-templates/brands";


interface IParams {
    params: {
        id: string
    }
}

export default async function BrandHandlePage({params}: IParams) {
    const response = await getDetailBrands(params?.id.toString());
    console.log("response",response,params.id);


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
                <BackLink href="/admin/brands" />
            </PageHeaderShell>
            {params.id.toString() === "create" ?
                <BrandHandleTemplate params={params.id.toString()} /> : (
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
                            <BrandHandleTemplate
                                params={params.id.toString()}
                                data={response?.payload?.data}
                            />
                        }
                    </React.Fragment>
                )
            }
        </Shell>
    )
}