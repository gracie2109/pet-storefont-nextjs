import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import {BackLink} from "@/components/back-link";
import * as React from "react";
import {Shell} from "@/components/shell";
import {getListPetWeight, getServiceOfPet} from "@/api-requests/pets";
import {getDetailService} from "@/api-requests/services";
import {ResultPageNotification} from "@/components/result-page-notification";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {PetsConfigServicePrice} from "@/components/handle-templates/pets-config-service-price";
import {QuickViewPetServicePrice} from "@/components/quick-view-pet-service-price";
import {Skeleton} from "@/components/ui/skeleton";
import {DataTableSkeleton} from "@/components/data-tables/data-table-skeleton";

interface PageProps {
    params: {
        petId: string;
        serviceId: string;
    }
}

export default async function PetDetailServicePage({params}: PageProps) {
    const pet = await getServiceOfPet(params.petId.toString());
    const service = await getDetailService(params.serviceId.toString());
    const weight = await getListPetWeight()
    const items = Object.keys(pet.payload.data.data);
    let mode = items.includes(params.serviceId) ? "edit" : "create";
    let serviceSelected = service?.payload?.data?._id === params.serviceId && pet.payload.data.data[params.serviceId];

    return (
        <React.Fragment>
            {(pet.status == 200 && service?.status == 200 && weight.status == 200) ? (
                <>
                    <Shell variant="default" as="div">
                        <PageHeaderShell separated>
                            <PageHeader className="flex-1">
                                <PageHeaderHeading size="sm">Service price
                                    of {pet?.payload?.data?.petId?.name}</PageHeaderHeading>
                                <PageHeaderDescription size="sm">
                                    Config price for service {service?.payload?.data?.name}
                                </PageHeaderDescription>
                            </PageHeader>
                            <div className="flex gap-5 ">
                                <QuickViewPetServicePrice
                                    pet={pet.payload?.data}
                                    weights={weight?.payload?.data}
                                    petId={params}
                                />
                                <BackLink href={`/admin/pets/${params.petId}`}/>
                            </div>
                        </PageHeaderShell>

                        <PetsConfigServicePrice
                            service={service.payload.data}
                            weights={weight.payload.data}
                            params={params}
                            serviceSelected={serviceSelected ? serviceSelected : null}
                            mode={mode}
                        />

                    </Shell>

                </>
            ) : (
                <Shell variant="default" as="div">
                    <ResultPageNotification
                        status={"404"}
                        title="Something went wrong!"
                        subtitle={"PET OR SERVICE NOT FOUND"}
                    >
                        <Link href={`/admin/pets/${params.petId.toString()}`}>
                            <Button size="sm">
                                Back
                            </Button>
                        </Link>
                    </ResultPageNotification>
                </Shell>
            )}

        </React.Fragment>
    )
}