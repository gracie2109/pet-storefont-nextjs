import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import {Shell} from "@/components/shell";
import {getListPets} from "@/api-requests/pets";
import {ResultPageNotification} from "@/components/result-page-notification";
import * as React from "react";
import {PetsShell} from "@/components/shells/pets-shell";
import Link from "next/link";
import {PlusCircle, Weight} from 'lucide-react';
import clsx from "clsx";
import {buttonVariants} from "@/components/ui/button";

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
                <Link href="/admin/pets/weights">
                    <div
                        className={clsx(" max-w-30",
                            buttonVariants({
                                variant: "default",
                                size: "sm",
                                className: "h-8",
                            })
                        )}
                    >
                        <Weight className="mr-2 h-4 w-4" aria-hidden="true"/>
                        Pet weights
                    </div>
                </Link>
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