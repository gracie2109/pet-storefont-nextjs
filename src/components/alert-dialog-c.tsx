'use client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"
import React from "react";

interface AlertDialogProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    title?: string,
    subtitle?: string,
    okText?: string,
    handleOk: () => void
}

export function AlertDialogC({open, okText, subtitle, title, handleOk, setOpen}: AlertDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {title ? title : "Are you absolutely sure?"}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {subtitle ? subtitle :
                            " This action cannot be undone. This will permanently delete data from our servers."}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => {  setOpen(false) }}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleOk}>
                        {okText ? okText : "Continute"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )

}