import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import {Shell} from "@/components/shell";
import * as React from "react";
import {getPetWeights} from "@/api-requests/pets";
import {PetsWeightsShell} from "@/components/shells/pet-weights-shell";
import {ResultPageNotification} from "@/components/result-page-notification";

export default async function PetWeightsPages() {
    const weights = await getPetWeights();
    return (
        <Shell variant="sidebar">
            <PageHeaderShell separated>
                <PageHeader>
                    <PageHeaderHeading size="sm">
                        PET WEIGHTS
                    </PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        Manager all pet-weights
                    </PageHeaderDescription>
                </PageHeader>
            </PageHeaderShell>
            {weights.status == 200 ? <PetsWeightsShell data={weights.payload.data}/> :
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