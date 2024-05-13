import {Shell} from "@/components/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import {getListPost} from "@/api-requests/news";
import {NewShell} from "@/components/shells/new-shell";
import {ResultPageNotification} from "@/components/result-page-notification";
import * as React from "react";


export default async function NewsPage(){
    const data = await getListPost();
    console.log("NewsPage", data);
    return (
        <Shell variant="sidebar">
            <PageHeaderShell separated >
                <PageHeader>
                    <PageHeaderHeading size="sm">News</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        Manage your news
                    </PageHeaderDescription>
                </PageHeader>
            </PageHeaderShell>

            {data.status == 200 ?
                <NewShell data={data.payload.data}/>
                :
                <ResultPageNotification
                    status="404"
                    title="Something went wrong!"
                    subtitle={"please try again"}
                >
                    <></>
                </ResultPageNotification>
            }
        </Shell>
    )
}