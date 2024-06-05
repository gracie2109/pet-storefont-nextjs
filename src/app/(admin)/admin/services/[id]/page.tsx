import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import {Shell} from "@/components/shell";
import Link from "next/link";
import {ServiceHandleTemplate} from "@/components/handle-templates/services";
import * as React from "react";
import {getDetailService} from "@/api-requests/services";
import {ResultPageNotification} from "@/components/result-page-notification";
import {Button} from "@/components/ui/button";
import {BackLink} from "@/components/back-link";
import {getListPets, getPetWeights} from "@/api-requests/pets";
import {ServiceTimerShell} from "@/components/service-timer-shell";


interface IParams {
    params: {
        id: string
    }
}

export default async function ServiceHandlePage({params}: IParams) {
    const response = await getDetailService(params?.id.toString());
    const weights = await getPetWeights();
    const pets = await getListPets();

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
                <BackLink href="/admin/services"/>
            </PageHeaderShell>
            {params.id == "create" ?
                (<>
                    <ServiceHandleTemplate params={params.id.toString()}
                                           weights={weights?.payload?.data || []}
                                           pets={pets?.payload?.data || []}
                    />


                </>): (
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
                           (<>
                               <ServiceHandleTemplate params={params.id.toString()}
                                                      data={response?.payload?.data}weights={weights?.payload?.data || []}
                                                      pets={pets?.payload?.data || []}

                               />


                           </>)
                        }
                    </React.Fragment>
                )
            }

        </Shell>
    )
}