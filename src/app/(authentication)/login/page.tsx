'use client';
import { AuthForm } from "@/components/forms/auth-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shell } from "@/components/shell";
import Link from "next/link";
import { OAuthSignIn } from "@/components/OAuthSignIn";
import { useQueryString } from "@/lib/helpers";
import React from "react";
import { ResultPageNotification } from "@/components/result-page-notification";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const [isLoginFailure, setIsLoginFailure] = React.useState(false);
    const { size, params } = useQueryString();

    React.useEffect(() => {
        if (size > 0 && ['token', 'isVerified', 'isActive']?.every((prop) => params.hasOwnProperty(prop))) {
            setIsLoginFailure(true)
        }
    }, [size, params])


    return (
        <Shell className="max-w-lg">
            {!isLoginFailure ? (
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Sign in</CardTitle>
                        <CardDescription>
                            Choose your preferred sign in method
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <OAuthSignIn />
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <AuthForm />
                    </CardContent>
                    <CardFooter className="flex flex-wrap items-center justify-between gap-2">
                        <div className="text-sm text-muted-foreground">
                            <span className="mr-1 hidden sm:inline-block">
                                Don&apos;t have an account?
                            </span>
                            <Link
                                aria-label="Sign up"
                                href="/register"
                                className="text-primary underline-offset-4 transition-colors hover:underline"
                            >
                                Sign up
                            </Link>
                        </div>
                        <Link
                            aria-label="Reset password"
                            href="/reset-password"
                            className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
                        >
                            Reset password
                        </Link>
                    </CardFooter>
                </Card>
            ) : (
                <ResultPageNotification
                    status={"403"}
                    title={params.isActive !== "Active" ? "Your account is locked" : params.isVerified ? "Your account is not verify" : "Something went wrong"}
                    subtitle={params.isActive !== "Active" ? "Contact with staff manager" : "Verify now"}
                >
                    {params.isVerified && (
                        <Button type="button">
                            Verify now
                        </Button>
                    )}
                    {params.isActive !== "Active" && (
                        <Button type="button">
                            Contact us
                        </Button>
                    )}
                </ResultPageNotification>
            )}
        </Shell>
    )
}