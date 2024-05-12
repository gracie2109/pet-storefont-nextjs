'use client';

import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {cn} from "@/lib/utils"
import React from "react";

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    title: string;
    desc?: string;
    handleOk?: (value: any) => void;
    open: boolean;
    setOpen: any
}

export function DialogC({children, title, desc, handleOk, open, setOpen, className, ...props}: DialogProps) {

    return (
        <Dialog open={open} onOpenChange={() => setOpen(false)} >
            <DialogContent className={cn(className)} {...props} >
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {desc && <DialogDescription>
                        {desc}
                    </DialogDescription>}
                </DialogHeader>
                {children}
                {handleOk && (
                    <DialogFooter>
                        <Button type="submit" onClick={handleOk}>Save changes</Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    )
}