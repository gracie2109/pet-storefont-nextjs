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
    const id = params.id.toString()
    const data = id !== "create" &&  await getDetailPost(params.id.toString());

    return (
        <Shell variant="sidebar" className="overflow-x-hidden">
            <PageHeaderShell separated>
                <PageHeader>
                    <PageHeaderHeading size="sm">
                        {id === "create" ? "New post" : "Edit post"}
                    </PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        {id !== "create" ? "Edit News" : "Create new post"}
                    </PageHeaderDescription>
                </PageHeader>
                <BackLink href="/admin/news"/>
            </PageHeaderShell>
            {id === "create" || (data && data?.status === 200 ) ? (
                <NewsHandleTemplate params={id} postSelected={data ? data.payload.data : null}/>
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