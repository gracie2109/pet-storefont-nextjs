'use client';
import {ScanEye} from 'lucide-react';
import {Button} from "@/components/ui/button";
import {TooltipContent, Tooltip, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"

import React from "react";
import {PetServiceListPrice} from "@/components/shells/pet-service-list-price";


export function QuickViewPetServicePrice({pet, weights, petId}:{pet:any, weights:any, petId:any}) {
    const [open, setOpen] = React.useState<boolean>(false);

    return (
       <React.Fragment>
           <TooltipProvider>
               <Tooltip>
                   <TooltipTrigger asChild onClick={() => setOpen(!open)}>
                       <Button size="icon" variant="link">
                           <ScanEye/>
                       </Button>
                   </TooltipTrigger>
                   <TooltipContent>
                       <p>Quick view service of pet</p>
                   </TooltipContent>
               </Tooltip>
           </TooltipProvider>
           <Sheet open={open} onOpenChange={() => setOpen(!open)}>
               <SheetContent side="top" className="space-y-5">
                   <SheetHeader>
                       <SheetTitle>List price of {pet?.petId?.name}</SheetTitle>
                       <SheetDescription>
                          This is price of all service belong with {pet?.petId?.name}
                       </SheetDescription>
                   </SheetHeader>
                    <PetServiceListPrice
                        services={pet}
                        petId={petId}
                        weights={weights}

                    />
               </SheetContent>
           </Sheet>

       </React.Fragment>
    )
}