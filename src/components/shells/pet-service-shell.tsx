'use client';

import React from "react"
import {Card, CardContent, CardTitle, CardHeader, CardDescription} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "next/navigation";
import {BackLink} from "@/components/back-link";
import {ServicesCard} from "@/components/cards/services-card";
import {PetServiceListPrice} from "@/components/shells/pet-service-list-price";
import {useMounted} from "@/hooks/use-mounted";

interface PetServiceShellProps {
    data: any,
    params: string,
    services: any[],
    weights: any[]
}

export function PetServiceShell({data, params, services, weights}: PetServiceShellProps) {
    const route = useRouter();
    const pathname = usePathname();
    const mouted = useMounted()

    const test = React.useMemo(() => {
        return (i: string): boolean => {
            if (services && data?.data) {
                const keys = Object.keys(data?.data);
                return keys.includes(i);
            }
            return false;
        }
    }, [data, services]);


    return (
        <React.Fragment>
            {mouted && (
                <>
                    {services.length <= 0 ? (
                        <Card className={"w-1/3"}>
                            <CardHeader>
                                <CardTitle>Not found services</CardTitle>
                                <CardDescription>Create new services to continue...</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button>
                                    <BackLink href="/admin/services" backText="Create new"/>
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-3  gap-3 ">
                            {services.map((i, j) => {
                                return (
                                    <ServicesCard key={j} data={i} isActive={test(i._id)}/>
                                )
                            })}

                        </div>
                    )}

                    {weights.length < 0 && data ? (
                        <div className="container p-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Not found weight</CardTitle>
                                    <CardDescription>Create new services to continue...</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button>
                                        Create Now
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <PetServiceListPrice
                            services={data}
                            weights={weights}
                            key="in_pet_detail_page"
                            petId={params}
                        />
                    )}

                </>
            )}
        </React.Fragment>
    )
}