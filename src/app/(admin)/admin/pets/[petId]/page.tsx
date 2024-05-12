
import {Shell} from "@/components/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import * as React from "react";
import {BackLink} from "@/components/back-link";
import {PetServiceShell} from "@/components/shells/pet-service-shell";
import {getListPetWeight, getServiceOfPet} from "@/api-requests/pets";
import {ResultPageNotification} from "@/components/result-page-notification";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {getListServices} from "@/api-requests/services";

interface PetParams {
    params: { petId: string; }
}


export default async function PetsService({params}: PetParams) {
    const data = await getServiceOfPet(params.petId.toString());
    const services = await getListServices();
    const weight = await getListPetWeight();

    return (
        <Shell variant="default" as="div">
            <PageHeaderShell separated>
                <PageHeader className="flex-1">
                    <PageHeaderHeading size="sm">Pets service</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        Manage your pets and price
                    </PageHeaderDescription>
                </PageHeader>
                <BackLink href="/admin/pets"/>
            </PageHeaderShell>
            {(data.status !== 200 || services.status !== 200 || weight.status !== 200) ? (
                <ResultPageNotification
                    status={"404"}
                    title="Something went wrong!"
                    subtitle={data?.payload?.error ?? ""}
                >
                    <Link href="/admin/pets">
                        <Button size="sm">
                            Back
                        </Button>
                    </Link>
                </ResultPageNotification>
            ) : <PetServiceShell
                    data={data.payload?.data}
                    params={params.petId.toString()}
                    services={services.payload.data}
                    weights={weight.payload.data}
                />
            }
        </Shell>

    )
}