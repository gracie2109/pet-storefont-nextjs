import {Shell} from "@/components/shell";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import {ResetPasswordForm} from "@/components/forms/reset-password-form";

export default function ResetPasswordPage() {
    return (
        <Shell className="max-w-lg h-screen">
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Reset Password</CardTitle>
                    <CardDescription>
                        Choose your preferred sign up method
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <ResetPasswordForm />
                </CardContent>

            </Card>
        </Shell>
    )
}