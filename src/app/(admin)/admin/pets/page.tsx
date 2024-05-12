import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import {Shell} from "@/components/shell";
import {getListPets} from "@/api-requests/pets";
import {ResultPageNotification} from "@/components/result-page-notification";
import * as React from "react";
import {PetsShell} from "@/components/shells/pets-shell";

export default async function PetPages() {
    const data = await getListPets();

    return (
        <Shell variant="sidebar">
            <PageHeaderShell separated>
                <PageHeader>
                    <PageHeaderHeading size="sm">PETS</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        Manage your pets
                    </PageHeaderDescription>
                </PageHeader>
            </PageHeaderShell>

            {data.status == 200 ?
                <React.Fragment>
                    <PetsShell data={data?.payload?.data}/>
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