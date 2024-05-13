import {Shell} from "@/components/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import { NewsHandleTemplate} from "@/components/handle-templates/news";
import {BackLink} from "@/components/back-link";
import {getDetailPost} from "@/api-requests/news";
import {ResultPageNotification} from "@/components/result-page-notification";
import * as React from "react";


interface Params {
    params: { id: string; }
}
export default async function NewsHandlePage({ params }: Params) {
    const data = await getDetailPost(params?.id.toString());

    return (
        <Shell variant="sidebar" className="overflow-x-hidden">
            <PageHeaderShell separated>
                <PageHeader>
                    <PageHeaderHeading size="sm">
                        {params.id === "create" ? "New post" : "Edit post"}
                    </PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        {params.id !== "create" ? "Edit News" : "Create new post"}
                    </PageHeaderDescription>
                </PageHeader>
                <BackLink href="/admin/news"/>
            </PageHeaderShell>
            {data?.status == 200 ? (
                <NewsHandleTemplate
                    params={params.id}
                    postSelected={data.payload.data}
                    mode={params.id}
                />
            ):(
                <ResultPageNotification
                    status="404"
                    title="Something went wrong!"
                    subtitle={"please try again"}
                >
                    <></>
                </ResultPageNotification>
            )}
        </Shell>
    )
}