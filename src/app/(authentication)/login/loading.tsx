import {AuthForm} from "@/components/forms/auth-form";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"
import {Shell} from "@/components/shell";
import Link from "next/link";

export default function LoginPageLoading() {


    return (
        <Shell className="max-w-lg">
            <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl"/>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]"/>
                    <Skeleton className="h-4 w-[200px]"/>
                </div>
            </div>
        </Shell>
    )
}