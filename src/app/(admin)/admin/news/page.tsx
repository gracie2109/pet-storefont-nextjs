import {Shell} from "@/components/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import {getListPost} from "@/api-requests/news";
import * as React from "react";
import {ResultPageNotification} from "@/components/result-page-notification";
import {NewsShell} from "@/components/shells/news-shell";


export default async function NewsPage(){
    const data = await getListPost();
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

                <React.Fragment>
                    <NewsShell data={data?.payload?.data}/>
                </React.Fragment>
                : (
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